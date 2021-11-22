import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-performancemetric-card',
  styleUrls: ['./performancemetric-card.component.scss'],
  templateUrl: './performancemetric-card.component.html',
})
export class PerformanceMetricCardComponent {

  flipped = false;

  @Input() pmname: string;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
