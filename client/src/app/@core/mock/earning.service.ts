import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { LiveUpdateChart, PieChart, EarningData } from '../data/earning';
import { SimulationcortexService } from './simulationcortex.service';

@Injectable()
export class EarningService extends EarningData {

  private currentDate: Date = new Date();
  private currentValue = Math.random() * 1000;
  private ONE_DAY = 24 * 3600 * 1000;

  private simulationcortexService = new SimulationcortexService();
  private stream: any;
  streamdata: number;

  constructor() {
    super();
    // this.simulationcortexService
    //   .getStreams()
    //   .subscribe((sendData: string) => {
    //     this.stream = (sendData);
    //     if (this.stream.pow) {
    //       this.streamdata = this.stream.pow[1];
    //     }
    //   });
    this.streamdata = 100;
  }

  private pieChartData = [
    {
      value: 20,
      name: 'Theta',
    },
    {
      value: 20,
      name: 'Alpha',
    },
    {
      value: 20,
      name: 'BetaL',
    },
    {
      value: 20,
      name: 'BetaH',
    },
    {
      value: 20,
      name: 'Gamma',
    },
  ];

  private liveUpdateChartData = {
    theta: {
      liveChart: [],
      delta: {
        up: true,
        value: 4,
      },
      dailyIncome: 45895,
    },
    alpha: {
      liveChart: [],
      delta: {
        up: false,
        value: 9,
      },
      dailyIncome: 5862,
    },
    betal: {
      liveChart: [],
      delta: {
        up: false,
        value: 21,
      },
      dailyIncome: 584,
    },
    betah: {
      liveChart: [],
      delta: {
        up: false,
        value: 21,
      },
      dailyIncome: 584,
    },
    gamma: {
      liveChart: [],
      delta: {
        up: false,
        value: 21,
      },
      dailyIncome: 584,
    },
  };

  getDefaultLiveChartData(elementsNumber: number) {
    console.log("element number getdefaultlivechartdata: " + elementsNumber);
    this.currentDate = new Date();
    this.currentValue = Math.random() * 1000;

    return Array.from(Array(elementsNumber))
      .map(item => this.generateRandomLiveChartData());
  }

  generateRandomLiveChartData() {
    this.currentDate = new Date(+this.currentDate + this.ONE_DAY);
    this.currentValue = this.currentValue + Math.random() * 20 - 11;

    if (this.currentValue < 0) {
      this.currentValue = Math.random() * 100;
    }

    return {
      value: [
        [
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate(),
        ].join('/'),
        Math.round(this.currentValue),
      ],
    };
  }

  getEarningLiveUpdateCardData(currency): Observable<any[]> {
    this.currentDate = new Date(+this.currentDate + this.ONE_DAY);
    const data = this.liveUpdateChartData[currency.toLowerCase()];
    let newValue: any;
    let oldValue: any = "";

    this.simulationcortexService
      .getStreams()
      .subscribe((sendData: string) => {
        this.stream = (sendData);
        if (this.stream.pow) {
          if (newValue != oldValue) {
            switch (currency.toLowerCase()) {
              case "theta":
                newValue = this.convertData(this.stream.pow[0]);
                break;
              case "alpha":
                newValue = this.convertData(this.stream.pow[1]);
                break;
              case "betal":
                newValue = this.convertData(this.stream.pow[2]);
                break;
              case "betah":
                newValue = this.convertData(this.stream.pow[3]);
                break;
              case "gamma":
                newValue = this.convertData(this.stream.pow[4]);
            }
            data.dailyIncome = newValue.value[1];
            console.log(newValue.value);
            data.liveChart.shift();
            data.liveChart.push(newValue);
            oldValue = newValue;
            return observableOf(data.liveChart);
          }
        }
      });
    return observableOf(data.liveChart);

  }

  convertData(value) {
    return {
      value: [
        [
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate(),
        ].join('/'),
        Math.round(value),
      ],
    };
  }

  getEEGLiveUpdateCardData(currency): Observable<any[]> {
    const data = this.liveUpdateChartData[currency.toLowerCase()];
    const newValue = this.generateRandomLiveChartData();

    console.log(newValue);

    data.liveChart.shift();
    data.liveChart.push(newValue);

    return observableOf(data.liveChart);
  }

  getEarningCardData(currency: string): Observable<LiveUpdateChart> {
    console.log("default ...band:" + currency);
    const data = this.liveUpdateChartData[currency.toLowerCase()];

    data.liveChart = this.getDefaultLiveChartData(150);

    return observableOf(data);
  }

  getEarningPieChartData(): Observable<PieChart[]> {
    return observableOf(this.pieChartData);
  }
}
