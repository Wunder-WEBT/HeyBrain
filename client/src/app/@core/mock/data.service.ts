import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

//Met
export interface PerformanceMetric {
  engagement: 0,
  excitement: 0,
  focus: 0,
  interest: 0,
  relaxation: 0,
  stress: 0,
}

//Met DayList
export interface PerformanceMetricDayListItem {
  day: 0,
  engagement: 0,
  excitement: 0,
  focus: 0,
  interest: 0,
  relaxation: 0,
  stress: 0,
}

//Met DayList
export interface PerformanceMetricMonthListItem {
  month: 0,
  engagement: 0,
  excitement: 0,
  focus: 0,
  interest: 0,
  relaxation: 0,
  stress: 0,
}


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private httpService: HttpService;


  constructor(httpService: HttpService, private toastrService: NbToastrService) {
    this.httpService = httpService;
  }

  showToast(message) {
    this.toastrService.show(message, "Info", { status: "info", duration: 5000, icon: "info-outline" });
  }

  init() {
    this.findAllMet();
    this.findAllPow();
    this.findAllPowLastMonth();
    this.findAllPowLastWeek();
    this.findAllMetLastMonth();
    this.findAllMetLastWeek();
    this.findAllMetCurrent();
    this.findAllPowCurrent();
    this.findAvgLastMonth();
    this.findAvgToday();
    this.findAvgYesterday();
    this.findAvgLastYear();
    this.findAvgAlphaMonth();
    this.findAvgEachDay();
    this.findAvgEachMonth();
  }

  //Performance Metrics
  allMet = new BehaviorSubject<Object>(undefined);
  findAllMet() {
    this.httpService.findAllMet().subscribe(data => { this.allMet.next(data) });
  }

  //Band Power
  allPow = new BehaviorSubject<Object>(undefined);
  findAllPow() {
    this.httpService.findAllPow().subscribe(data => { this.allPow.next(data) });
  }

  //Band Power from last month
  allPowLastMonth = new BehaviorSubject<Object>(undefined);
  findAllPowLastMonth() {
    this.httpService.findAllPowLastMonth().subscribe(data => { this.allPowLastMonth.next(data) });
  }

  //Band Power from last week
  allPowLastWeek = new BehaviorSubject<Object>(undefined);
  findAllPowLastWeek() {
    (this.httpService.findAllPowLastWeek().subscribe(data => { this.allPowLastWeek.next(data) }));
  }

  //Performance Metrics from last month
  allMetLastMonth = new BehaviorSubject<Object>(undefined);
  findAllMetLastMonth() {
    this.httpService.findAllMetLastMonth().subscribe(data => { this.allMetLastMonth.next(data) });
  }

  //Performance Metrics from last week
  allMetLastWeek = new BehaviorSubject<Object>(undefined);
  findAllMetLastWeek() {
    this.httpService.findAllMetLastWeek().subscribe(data => { this.allMetLastWeek.next(data) });
  }

  //Performance Metrics from last month
  allMetCurrent = new BehaviorSubject<Object>(undefined);
  findAllMetCurrent() {
    this.httpService.findAllMetCurrent().subscribe(data => { this.allMetCurrent.next(data) });
  }

  //Performance Metrics from last week
  allPowCurrent = new BehaviorSubject<Object>(undefined);
  findAllPowCurrent() {
    this.httpService.findAllPowCurrent().subscribe(data => { this.allPowCurrent.next(data) });
  }

  //Performance Metrics Avg Values from last month
  avgLastMonth = new BehaviorSubject<Object>(undefined);
  findAvgLastMonth() {
    this.httpService.findAvgLastMonth().subscribe(data => { this.avgLastMonth.next(data) });
  }

  //Performance Metrics Avg Values from today
  avgToday = new BehaviorSubject<PerformanceMetric>(undefined);
  findAvgToday() {
    this.httpService.findAvgToday().subscribe(data => {
      if (data.engagement == null) {
        this.showToast("Heute wurden noch keine Werte gemessen!");
        data.engagement = 0;
        data.excitement = 0;
        data.focus = 0;
        data.interest = 0;
        data.relaxation = 0;
        data.stress = 0;
      }
      this.avgToday.next(data);
    })
  }

  //Performance Metrics Avg Values from yesterday
  avgYesterday = new BehaviorSubject<PerformanceMetric>(undefined);
  findAvgYesterday() {
    this.httpService.findAvgYesterday().subscribe(data => {
      if (data.engagement == null) {
        this.showToast("Gestern wurden keine Werte gemessen!");
        data.engagement = 0;
        data.excitement = 0;
        data.focus = 0;
        data.interest = 0;
        data.relaxation = 0;
        data.stress = 0;
      }
      this.avgYesterday.next(data)
    });
  }

  //Performance Metrics Avg Values from Last Year
  avgLastYear = new BehaviorSubject<Object>(undefined);
  findAvgLastYear() {
    this.httpService.findAvgLastYear().subscribe(data => { this.avgLastYear.next(data) });
  }

  // Avg Alpha Values from Last Month
  avgAlphaMonth = new BehaviorSubject<Object>(undefined);
  findAvgAlphaMonth() {
    this.httpService.findAvgAlphaMonth().subscribe(data => { this.avgAlphaMonth.next(data) });
  }

  // Performance Metrics Avg Values from Last 7 Days
  avgEachDay = new BehaviorSubject<Array<PerformanceMetricDayListItem>>(undefined);
  findAvgEachDay() {
    this.httpService.findAvgEachDay().subscribe(data => { this.avgEachDay.next(data) });
  }


  // Performance Metrics Avg Values from Last 7 Days
  avgEachMonth = new BehaviorSubject<Array<PerformanceMetricMonthListItem>>(undefined);
  findAvgEachMonth() {
    this.httpService.findAvgEachMonth().subscribe(data => { this.avgEachMonth.next(data) });
  }
}
