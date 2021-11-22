import { Component, OnDestroy } from '@angular/core';
import { PieChart, EarningData } from '../../../../@core/data/earning';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-eegdata-card-back',
  styleUrls: ['./eegdata-card-back.component.scss'],
  templateUrl: './eegdata-card-back.component.html',
})
export class EEGDataCardBackComponent implements OnDestroy {
  private alive = true;

  ngOnDestroy() {
    this.alive = false;
  }
}
