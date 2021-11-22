import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerformanceMetric, PerformanceMetricDayListItem, PerformanceMetricMonthListItem } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  //Performance Metrics
  findAllMet() {
    return this.http.get<String>('http://localhost:2108/findAllMet');
  }

  //Band Power
  findAllPow() {
    return this.http.get<String>('http://localhost:2108/findAllPow');
  }

  //Band Power from last month
  findAllPowLastMonth() {
    return this.http.get<String>('http://localhost:2108/findAllPowLastMonth');
  }

  //Band Power from last week
  findAllPowLastWeek() {
    return this.http.get<String>('http://localhost:2108/findAllPowLastWeek');
  }

  //Performance Metrics from last month
  findAllMetLastMonth() {
    return this.http.get<String>('http://localhost:2108/findAllMetLastMonth');
  }

  //Performance Metrics from last week
  findAllMetLastWeek() {
    return this.http.get<String>('http://localhost:2108/findAllMetLastWeek');
  }

  //Performance Metrics from last month
  findAllMetCurrent() {
    return this.http.get<String>('http://localhost:2108/findAllMetCurrent');
  }

  //Performance Metrics from last week
  findAllPowCurrent() {
    return this.http.get<String>('http://localhost:2108/findAllPowCurrent');
  }

  //Performance Metrics Avg Values from last month
  findAvgLastMonth() {
    return this.http.get<String>('http://localhost:2108/findAvgLastMonth');
  }

  //Performance Metrics Avg Values from today
  findAvgToday() {
    return this.http.get<PerformanceMetric>('http://localhost:2108/findAvgToday');
  }

  //Performance Metrics Avg Values from yesterday
  findAvgYesterday() {
    return this.http.get<PerformanceMetric>('http://localhost:2108/findAvgYesterday');
  }

  //Performance Metrics Avg Values from Last Year
  findAvgLastYear() {
    return this.http.get<String>('http://localhost:2108/findAvgLastYear');
  }

  // Avg Alpha Values from Last Month
  findAvgAlphaMonth() {
    return this.http.get<String>('http://localhost:2108/findAvgAlphaMonth');
  }

  // Performance Metrics Avg Values from Last 7 Days
  findAvgEachDay() {
    return this.http.get<Array<PerformanceMetricDayListItem>>('http://localhost:2108/findAvgEachDay');
  }

  // Avg Values from Last Month per Month
  findAvgEachMonth() {
    return this.http.get<Array<PerformanceMetricMonthListItem>>('http://localhost:2108/findAvgEachMonth');
  }
}
