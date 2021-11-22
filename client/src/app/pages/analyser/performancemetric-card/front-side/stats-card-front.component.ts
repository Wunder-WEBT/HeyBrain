import { Component, Input, OnInit } from '@angular/core';
import { ProfitBarAnimationChartData } from '../../../../@core/data/profit-bar-animation-chart';
import { takeWhile } from 'rxjs/operators';
import {
  DataService,
  PerformanceMetric
} from '../../../../@core/mock/data.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'ngx-stats-card-front',
  styleUrls: ['./stats-card-front.component.scss'],
  templateUrl: './stats-card-front.component.html',
})

export class StatsCardFrontComponent implements OnInit {

  private alive = true;

  linesData: { firstLine: number[]; secondLine: number[] };

  @Input() pmname: string;

  ngOnInit() {
    let fl = 0, sl = 0;
    this.dataService.avgToday.subscribe((s: PerformanceMetric) => {
      if (s != undefined) {
        this.profitBarAnimationChartService.getChartData()
          .pipe(takeWhile(() => this.alive))
          .subscribe(() => {
            switch (this.pmname) {
              case "Entspannungslevel":
                fl = Math.round(s.relaxation * 1000);
                break;
              case "Aufregung":
                fl = Math.round(s.excitement * 1000);
                break;
              case "Interesse":
                fl = Math.round(s.interest * 1000);
                break;
              default:
                break;
            }
            this.linesData = {
              firstLine: [fl],
              secondLine: [sl]
            };
          });
      }
    });
    this.dataService.avgYesterday.subscribe((s: PerformanceMetric) => {
      if (s != undefined) {
        this.profitBarAnimationChartService.getChartData()
          .pipe(takeWhile(() => this.alive))
          .subscribe(() => {
            switch (this.pmname) {
              case "Entspannungslevel":
                sl = Math.round(s.relaxation * 1000);
                break;
              case "Aufregung":
                sl = Math.round(s.excitement * 1000);
                break;
              case "Interesse":
                sl = Math.round(s.interest * 1000);
                break;
              default:
                break;
            }
            this.linesData = {
              firstLine: [fl],
              secondLine: [sl]
            };
          });
      }
    });
  }

  constructor(private profitBarAnimationChartService: ProfitBarAnimationChartData, private dataService: DataService) {

  }
}
