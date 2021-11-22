import { Component } from '@angular/core';

@Component({
  selector: 'ngx-eegdata-card',
  styleUrls: ['./eegdata-card.component.scss'],
  templateUrl: './eegdata-card.component.html',
})
export class EarningCardComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
