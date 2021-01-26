import { Component, OnInit, ViewChild } from '@angular/core';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { BaseChartDirective } from 'ng2-charts';
import { Subject } from 'rxjs';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-stats-best-categories',
  templateUrl: './stats-best-categories.component.html',
  styleUrls: ['./stats-best-categories.component.scss']
})
export class StatsBestCategoriesComponent extends DestroyObservable implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  destroy$: Subject<boolean> = new Subject<boolean>();

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 10,
        usePointStyle: true
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      callbacks: {
        title: function() {
        }
      }
    }
  };
  chartData = null;

  constructor(public _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    // If you want to add time filter
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(() => {
          this.getGraph();
        }
      );
  }

  getGraph() {
    this._statsService.getBestCategoriesData().subscribe(
      (value) => {
        this.chartData = [];
        value['mostAskedCategories'].forEach(elem => {
          this.chartData.push({
            data: [parseInt(elem['count'], 10)],
            label: elem['category']
          });
        });
        setTimeout(() => {
          this.updateChart();
        });
      }
    );
  }

  async updateChart() {
    this.chart.chart.update(); // This re-renders the canvas element.
  }

  downloadCanvasBest(event) {
    const anchor = event.target;
    const name = 'bestCategoriesChart-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[2].toDataURL();
    anchor.download = name;
  }

  download() {
    const btn: HTMLElement = document.getElementById('downloadBestCategoriesBtn');
    btn.click();
  }

}
