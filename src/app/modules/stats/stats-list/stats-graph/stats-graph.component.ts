import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { BaseChartDirective } from 'ng2-charts';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/fr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent extends DestroyObservable implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  startDate: Date;
  endDate: Date;
  dataset1 = [];
  dataset2 = [];
  dataset3 = [];
  questionsPanel = [];
  intentPanel = [];
  visitorsPanel = [];
  parsedData: Object;
  questionDisplay = true;
  visitorsDisplay = true;
  intentDisplay = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
          radius: 0
      }
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
          type: 'time',
          time: {
              unit: 'day',
              tooltipFormat: 'DD/MM/YYYY',
              displayFormats: {
                'day': 'DD MMM'
             }
          }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}}
        }
      }]
  }
  };
  chartData = [
    { data: [0], label: 'Questions posées', fill: false, pointHitRadius: 5},
    { data: [0], label: 'Questions ajoutées', fill: false, pointHitRadius: 5},
    { data: [0], label: 'Nb sessions', fill: false, pointHitRadius: 5}
  ];
  chartLabels = [];
  chartColors = [
    { // first color
      borderColor: '#40b374',
      pointBackgroundColor: '#40b374',
      pointBorderColor: '#fff',
    },
    { // second color
      borderColor: '#fab7b9',
      pointBackgroundColor: '#fab7b9',
      pointBorderColor: '#fff',
    },
    { // third color
      borderColor: '#fab754',
      pointBackgroundColor: '#fab754',
      pointBorderColor: '#fff',
    }];

  constructor(public _statsService: StatsService) {
    super();
  }

  ngOnInit(): void {
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
    this.startDate = dates?.startDate ? moment(dates.startDate).toDate() : moment().subtract(1, 'month').toDate();
    this.endDate = dates?.endDate ? moment(dates.endDate).toDate() : moment().toDate();

    if (this.startDate > this.endDate) {
      this.startDate = this.endDate;
    }
    this.setXAxis(this.startDate, this.endDate);

    this._statsService.getGraphData().subscribe(
      (result) => {
        this.parsedData = this.parseData(result);
        this.parsedData['question'].forEach(elem => {
          const position = this.chartLabels.indexOf(elem.date) + 1;
          this.dataset1[position] = Number(elem.count);
        });
        this.parsedData['visitors'].forEach(elem => {
          const position = this.chartLabels.indexOf(elem.date) + 1;
          this.dataset2[position] = Number(elem.count);
        });
        this.parsedData['intents'].forEach(elem => {
          const position = this.chartLabels.indexOf(elem.date) + 1;
          this.dataset3[position] = Number(elem.count);
        });

        this.questionsPanel = this.getPanelData(this.dataset1, this.chartLabels);
        this.intentPanel = this.getPanelData(this.dataset3, this.chartLabels);
        this.visitorsPanel = this.getPanelData(this.dataset2, this.chartLabels);
        this.chartData = [];
        if (this.questionDisplay) {
          this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false, pointHitRadius: 5});
        }
        if (this.visitorsDisplay) {
          this.chartData.push({ data: this.dataset2, label: 'Nb sessions', fill: false, pointHitRadius: 5});
        }
        if (this.intentDisplay) {
          this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false, pointHitRadius: 5});
        }
      }
    );
  }

  setXAxis(start, end) {
    const current = start ? new Date(start) : this.startDate;
    this.dataset1 = [];
    this.dataset2 = [];
    this.dataset3 = [];
    this.chartLabels = [];
    while (current <= (end ? end : this.endDate)) {
      // Warning on this string
      this.chartLabels.push(current.toLocaleDateString('en-US'));
      this.dataset1.push(0);
      this.dataset2.push(0);
      this.dataset3.push(0);
      current.setDate(current.getDate() + 1);
    }
  }

  parseData(dataToParse) {
    const parsedData = {};
    if (dataToParse['askedQuestionsNumber']) {
      parsedData['question'] = [];
      dataToParse['askedQuestionsNumber'].forEach(obj => {
        parsedData['question'].push({
          date: new Date(obj['date'].substring(0, 10)).toLocaleDateString('en-US'),
          count: obj['count']});
      });
    }
    if (dataToParse['visitorNumber']) {
      parsedData['visitors'] = [];
      dataToParse['visitorNumber'].forEach(obj => {
        parsedData['visitors'].push({
          date: new Date(obj['date'].substring(0, 10)).toLocaleDateString('en-US'),
          count: obj['count']});
      });
    }
    if (dataToParse['dbQuestionSize']) {
      parsedData['intents'] = [];
      dataToParse['dbQuestionSize'].forEach(obj => {
        parsedData['intents'].push({
          date: new Date(obj['date'].substring(0, 10)).toLocaleDateString('en-US'),
          count: obj['count']});
      });
    }
    return parsedData;
  }

  getPanelData(values, dates) {
    const dataArray = [];
    dataArray['count'] = 0;
    values.forEach(elem => {
      dataArray['count'] = dataArray['count'] + Number(elem);
    });
    dataArray['maxNb'] = values.reduce((a, b) => Math.max(a, b));
    dataArray['minNb'] = values.reduce((a, b) => Math.min(a, b));
    dataArray['maxDay'] = moment(dates[(values.lastIndexOf(dataArray['maxNb']))]).format('dddd Do MMMM YYYY');
    dataArray['minDay'] = moment(dates[(values.lastIndexOf(dataArray['minNb']))]).format('dddd Do MMMM YYYY');

    return dataArray;
  }

  displayQuestionPanel() {
    this.questionDisplay = !this.questionDisplay;
    this.chartData = [];
    if (this.questionDisplay) {
      this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Questions posées', fill: false, pointHitRadius: 5 });
    }
    if (this.visitorsDisplay) {
      this.chartData.push({ data: this.dataset2, label: 'Nb sessions', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Nb sessions', fill: false, pointHitRadius: 5 });
    }
    if (this.intentDisplay) {
      this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Questions ajoutées', fill: false, pointHitRadius: 5 });
    }
    this.updateChart();
  }

  displayVisitorPanel() {
    this.visitorsDisplay = !this.visitorsDisplay;
    this.chartData = [];
    if (this.questionDisplay) {
      this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false, pointHitRadius: 5});
    } else {
      this.chartData.push({ data: [], label: 'Questions posées', fill: false, pointHitRadius: 5 });
    }
    if (this.visitorsDisplay) {
      this.chartData.push({ data: this.dataset2, label: 'Nb sessions', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Nb sessions', fill: false, pointHitRadius: 5 });
    }
    if (this.intentDisplay) {
      this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Questions ajoutées', fill: false, pointHitRadius: 5 });
    }
    this.updateChart();
  }

  displayIntentPanel() {
    this.intentDisplay = !this.intentDisplay;
    this.chartData = [];
    if (this.questionDisplay) {
      this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Questions posées', fill: false, pointHitRadius: 5 });
    }
    if (this.visitorsDisplay) {
      this.chartData.push({ data: this.dataset2, label: 'Nb sessions', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Nb sessions', fill: false, pointHitRadius: 5 });
    }
    if (this.intentDisplay) {
      this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false, pointHitRadius: 5 });
    } else {
      this.chartData.push({ data: [], label: 'Questions ajoutées', fill: false, pointHitRadius: 5 });
    }
    this.updateChart();
  }

  updateChart() {
    this.chart.chart.update(); // This re-renders the canvas element.
  }

  downloadCanvas(event) {
    const anchor = event.target;
    const name = 'globalStats-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = name;
  }

  download() {
    const btn: HTMLElement = document.getElementById('downloadGraphBtn');
    btn.click();
  }
}
