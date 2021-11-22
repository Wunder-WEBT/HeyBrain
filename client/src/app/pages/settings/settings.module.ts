import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbUserModule, NbInputModule } from '@nebular/theme';
import { SettingsComponent } from './settings.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    ThemeModule,
    CommonModule,
    NbCardModule,
    NbUserModule,
    NbInputModule,
  ]
})
export class SettingsModule { }
