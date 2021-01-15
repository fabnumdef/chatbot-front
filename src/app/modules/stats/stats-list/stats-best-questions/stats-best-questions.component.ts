import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stats-best-questions',
  templateUrl: './stats-best-questions.component.html',
  styleUrls: ['./stats-best-questions.component.scss']
})
export class StatsBestQuestionsComponent extends DestroyObservable implements OnInit {

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
    this._statsService.getBestQuestionsData().subscribe(
      (value) => {
        this.chartData = [];
        value['mostAskedQuestions'].forEach(elem => {
          this.chartData.push({
            data: [parseInt(elem['count'], 10)],
            label: elem['question']
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
    const name = 'bestQuestionsChart-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL();
    anchor.download = name;
  }

  download() {
    const btn: HTMLElement = document.getElementById('downloadBestQuestBtn');
    btn.click();
  }
}

