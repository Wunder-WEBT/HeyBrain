import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { PeriodsService } from './periods.service';
import { OutlineData, VisitorsAnalyticsData } from '../data/visitors-analytics';
import { DataService, PerformanceMetricDayListItem } from './data.service';

@Injectable()
export class VisitorsAnalyticsService extends VisitorsAnalyticsData {

  constructor(private periodService: PeriodsService, private dataService: DataService) {
    super();
    this.dataService.avgEachDay.subscribe((s: Array<PerformanceMetricDayListItem>) => {
      if (s != undefined) {
        s.sort((a, b) => a.day - b.day);
        this.outerLinePoints = [];
        this.innerLinePoints = [];
        for (let index = s.length-1; index >= 0; index--) {
          const element = s[index];

          if(element!=null){
            this.outerLinePoints.push(Math.round(element.stress*1000));
            this.innerLinePoints.push(Math.round(element.engagement*1000));
          }else{
            this.outerLinePoints.push(0);
            this.innerLinePoints.push(0);
          }
        }
      }
    });
  }

  private pieChartValue = 75;
  private innerLinePoints: number[] = [
    1, 1, 1, 1, 1, 1, 1
  ];
  private outerLinePoints: number[] = [
    1, 1, 1, 1, 1, 1, 1
  ];
  private generateOutlineLineData(): OutlineData[] {
    const days = this.periodService.sortWeekDays(this.periodService.getWeeks());
    const outerLinePointsLength = this.outerLinePoints.length;
    const daysLength = days.length;

    return this.outerLinePoints.map((p, index) => {
      const monthIndex = Math.round(index);
      const label = (index % Math.round(outerLinePointsLength / daysLength) === 0)
        ? days[monthIndex]
        : '';

      return {
        label,
        value: p,
      };
    });
  }

  getInnerLineChartData(): Observable<number[]> {
    return observableOf(this.innerLinePoints);
  }

  getOutlineLineChartData(): Observable<OutlineData[]> {
    return observableOf(this.generateOutlineLineData());
  }

  getPieChartData(): Observable<number> {
    return observableOf(this.pieChartValue);
  }
}
