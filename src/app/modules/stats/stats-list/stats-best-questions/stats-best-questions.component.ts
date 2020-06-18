import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

  data = [
    { value: [255], question: 'Lorem ipsum est istes opus nexis orem ipsum est istes opus '}
  ];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: {
        padding: 20,
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
        title: function() {}
     }
    }
  };
  chartData = [
    { data: this.data[0].value, label: this.data[0].question },
  ];

  constructor(public _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
    this.getGraph(null);
    // If you want to add time filter
    this._statsService._currentFilters$
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(
      (value) => {
        this.getGraph(value);
      }
    );
  }

  getGraph(dates) {
    this._statsService.getBestQuestionsData().subscribe(
      (value) => {
        this.data = [];
        this.chartData = [];
        this.data = value['mostAskedQuestions'];
        this.data.forEach(elem => {
          this.chartData.push({
            data: elem['count'],
            label: elem['question']
          });
        });
        this.updateChart();
      }
    );
  }

  updateChart() {
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

