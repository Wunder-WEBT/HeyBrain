import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-chart-panel-summary',
  styleUrls: ['./chart-panel-summary.component.scss'],
  template: `
    <div class="summary-container">
      <div class="h6">Entspannung, Aufregung und Stress im Vergleich</div>
    </div>
  `,
})
export class ChartPanelSummaryComponent {
  @Input() summary: {title: string; value: number}[];
}

