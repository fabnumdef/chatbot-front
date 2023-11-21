import { Component, HostListener, OnInit } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-stats-best-categories',
  templateUrl: './stats-best-categories.component.html',
  styleUrls: ['./stats-best-categories.component.scss']
})
export class StatsBestCategoriesComponent extends DestroyObservable implements OnInit {

  chartData: any[];

  dataUrl: string;

  constructor(private statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    // If you want to add time filter
    this.statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(() => {
          this.getGraph();
        }
      );
  }

  getGraph() {
    this.statsService.getBestCategoriesData().subscribe(
      (value: any) => {
        this.chartData = value.mostAskedCategories.map(elem => ({
            value: [parseInt(elem.count, 10)],
            name: elem.category
          }));
        setTimeout(() => {
          this.setGraphMargin();
        });
      }
    );
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = `bestCategoriesChart-${  moment(new Date()).format('DDMMYYYYHHmmss')  }.jpg`;
    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  async download() {
    // Get the chart
    const node = document.getElementsByClassName('ngx-charts-outer')[2];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('downloadBestCategoriesBtn');
    btn.click();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setGraphMargin();
  }

  private setGraphMargin() {
    const legendNode = document.querySelectorAll('.stats-best-categories .chart-legend')[0];
    const graphNode = <HTMLElement> document.querySelectorAll('.stats-best-categories .chart-container')[0];
    if (!graphNode) {
      return;
    }
    graphNode.style.marginBottom = `${legendNode.clientHeight  }px`;
  }

}
