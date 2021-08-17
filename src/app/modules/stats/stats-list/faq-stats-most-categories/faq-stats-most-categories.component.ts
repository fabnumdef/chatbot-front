import { Component, HostListener, OnInit } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import { DestroyObservable } from '@core/utils/destroy-observable';
import domtoimage from 'dom-to-image';
import * as moment from 'moment';

@Component({
  selector: 'app-faq-stats-most-categories',
  templateUrl: './faq-stats-most-categories.component.html',
  styleUrls: ['./faq-stats-most-categories.component.scss']
})
export class FaqStatsMostCategoriesComponent extends DestroyObservable implements OnInit {

  results: any[];
  dataUrl: string;

  constructor(private _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(() => {
          this.getGraph();
        }
      );
  }

  getGraph() {
    this._statsService.getFaqMostCategoriesData().subscribe(
      (value) => {
        this.results = value['mostAskedCategories'].map(elem => {
          return {
            value: [parseInt(elem['count'], 10)],
            name: elem['category']
          };
        });
        setTimeout(() => {
          this._setGraphMargin();
        });
      }
    );
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = 'mostFaqCategoriesChart-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';

    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  async download() {
    // Get the chart
    const node = document.getElementsByClassName('ngx-charts-outer')[0];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('downloadMostFaqCatBtn');
    btn.click();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._setGraphMargin();
  }

  private _setGraphMargin() {
    const legendNode = document.querySelectorAll('.faq-stats-most-categories .chart-legend')[0];
    const graphNode = <HTMLElement> document.querySelectorAll('.faq-stats-most-categories .chart-container')[0];
    if (!graphNode) {
      return;
    }
    graphNode.style.marginBottom = legendNode.clientHeight + 'px';
  }

}
