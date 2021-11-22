import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { NbButtonModule, NbCardModule, NbIconModule, NbSelectModule, NbListModule, NbProgressBarModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { StatusCardComponent } from './status-card/status-card.component';


@NgModule({
  declarations: [
    HomeComponent,
    StatusCardComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbProgressBarModule,
  ]
})
export class HomeModule { }
