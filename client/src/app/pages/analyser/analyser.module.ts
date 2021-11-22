
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalyserComponent } from './analyser.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbListModule, NbProgressBarModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { PerformanceMetricCardComponent } from './performancemetric-card/performancemetric-card.component';
import { StatsCardBackComponent } from './performancemetric-card/back-side/stats-card-back.component';
import { StatsAreaChartComponent } from './performancemetric-card/back-side/stats-area-chart.component';
import { StatsBarAnimationChartComponent } from './performancemetric-card/front-side/stats-bar-animation-chart.component';
import { StatsCardFrontComponent } from './performancemetric-card/front-side/stats-card-front.component';

import {
  ECommerceVisitorsAnalyticsComponent,
} from './visitors-analytics/visitors-analytics.component';
import {
  ECommerceVisitorsAnalyticsChartComponent,
} from './visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import {
  ECommerceVisitorsStatisticsComponent,
} from './visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceLegendChartComponent } from './visitors-analytics/legend-chart/legend-chart.component';


import { SlideOutComponent } from './visitors-analytics/slide-out/slide-out.component';

import { PlayerComponent } from './player/player.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';

@NgModule({
  declarations: [
    AnalyserComponent,
    PerformanceMetricCardComponent,
    StatsCardFrontComponent,
    StatsAreaChartComponent,
    StatsBarAnimationChartComponent,
    StatsCardBackComponent,
    PlayerComponent,
    ECommerceVisitorsAnalyticsComponent,
    ECommerceVisitorsAnalyticsChartComponent,
    ECommerceVisitorsStatisticsComponent,
    ECommerceLegendChartComponent,
    SlideOutComponent,

    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
  ],
  imports: [CommonModule,
    ThemeModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NgxEchartsModule,
    NgxChartsModule],

})
export class AnalyserModule { }
