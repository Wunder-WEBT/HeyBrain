import { Injectable } from '@angular/core';
import { PeriodsService } from './periods.service';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import { DataService, PerformanceMetricDayListItem, PerformanceMetricMonthListItem } from './data.service';

@Injectable()
export class OrdersChartService extends OrdersChartData {

  private year = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
  ];

  private data = {};
  dataForWeekPeriod: OrdersChart = {
    chartLabel: this.getDataLabels(7, this.period.sortWeekDays(this.period.getWeeks())),
    linesData: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
  };
  dataForMonthPeriod: OrdersChart = {
    chartLabel: this.getDataLabels(12, this.period.sortMonths(this.period.getMonths())),
    linesData: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  };

  constructor(private period: PeriodsService, private dataService: DataService) {
    super();
    this.dataService.avgEachDay.subscribe((s: Array<PerformanceMetricDayListItem>) => {
      this.dataForWeekPeriod = this.getDataForWeekPeriod(s);
      this.data = {
        week: this.dataForWeekPeriod,
        month: this.dataForMonthPeriod,
      };
    });
    this.dataService.avgEachMonth.subscribe((s: Array<PerformanceMetricMonthListItem>) => {
      this.dataForMonthPeriod = this.getDataForMonthPeriod(s);
      this.data = {
        week: this.dataForWeekPeriod,
        month: this.dataForMonthPeriod,
      };
    });
  }

  private getDataForWeekPeriod(s: Array<PerformanceMetricDayListItem>): OrdersChart {
    let entspannung = [0, 0, 0, 0, 0, 0, 0], aufregung = [0, 0, 0, 0, 0, 0, 0], stress = [0, 0, 0, 0, 0, 0, 0];
    if (s != undefined) {
      entspannung = [], aufregung = [], stress = [];
      s.forEach(element => {
        entspannung.push(Math.round(element.relaxation * 1000));
        aufregung.push(Math.round(element.excitement * 1000));
        stress.push(Math.round(element.stress * 1000));
      });
      entspannung.reverse();
      aufregung.reverse();
      stress.reverse();
    }
    return {
      chartLabel: this.getDataLabels(7, this.period.sortWeekDays(this.period.getWeeks())),
      linesData: [
        entspannung,
        aufregung,
        stress,
      ],
    };
  }

  private getDataForMonthPeriod(s: Array<PerformanceMetricMonthListItem>): OrdersChart {

    let entspannung =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], aufregung = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stress = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (s != undefined) {
      s.sort((a,b)=>a.month-b.month);
      entspannung = [], aufregung = [], stress = [];
      s.forEach(element => {
        entspannung.push(Math.round(element.relaxation * 1000));
        aufregung.push(Math.round(element.excitement * 1000));
        stress.push(Math.round(element.stress * 1000));
      });
      entspannung.reverse();
      aufregung.reverse();
      stress.reverse();

    }
    return {
      chartLabel: this.getDataLabels(12, this.period.sortMonths(this.period.getMonths())),
      linesData: [
        entspannung,
        aufregung,
        stress,
      ],
    };
  }

  getDataLabels(nPoints: number, labelsArray: string[]): string[] {
    const labelsArrayLength = labelsArray.length;
    const step = Math.round(nPoints / labelsArrayLength);

    return Array.from(Array(nPoints)).map((item, index) => {
      const dataIndex = Math.round(index / step);

      return index % step === 0 ? labelsArray[dataIndex] : '';
    });
  }

  getOrdersChartData(period: string): OrdersChart {
    return this.data[period];
  }
}
