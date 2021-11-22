import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EEGDataComponent } from '../eegdata/eegdata.component';

import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbListModule, NbProgressBarModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ThemeModule } from '../../@theme/theme.module';

import { EarningCardComponent } from './eegdata-card/eegdata-card.component';
import { EEGDataCardBackComponent } from './eegdata-card/back-side/eegdata-card-back.component';
import { EEGDataPieChartComponent } from './eegdata-card/back-side/eegdata-pie-chart.component';
import { EEGDataCardFrontComponent } from './eegdata-card/front-side/eegdata-card-front.component';
import { EEGDataLiveUpdateChartComponent } from './eegdata-card/front-side/eegdata-live-update-chart.component';

import { ECommerceProgressSectionComponent } from './progress-section/progress-section.component';

import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';


@NgModule({
  declarations: [
    EEGDataComponent,
    EarningCardComponent,
    EEGDataCardBackComponent,
    EEGDataPieChartComponent,
    EEGDataCardFrontComponent,
    EEGDataLiveUpdateChartComponent,
    ECommerceProgressSectionComponent,
    ElectricityComponent,
    ElectricityChartComponent,
  ],
  imports: [
    CommonModule,
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
    NgxChartsModule
  ]
})
export class EegdataModule { }
