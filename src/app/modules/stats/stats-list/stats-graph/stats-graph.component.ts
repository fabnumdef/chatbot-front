import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { BaseChartDirective } from 'ng2-charts';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import 'moment/locale/fr';
import { Subject } from 'rxjs';
import * as chartJs from 'chart.js';

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
  private _datasetQuestions = {data: [0], label: 'Questions posées', fill: false, pointHitRadius: 5};
  private _datasetIntents = {data: [0], label: 'Questions ajoutées', fill: false, pointHitRadius: 5};
  private _datasetVisitors = {data: [0], label: 'Nb sessions', fill: false, pointHitRadius: 5};
  private _datasetFeedbacks = {data: [0], label: 'Retours utilisateurs', fill: false, pointHitRadius: 5};
  questionsPanel = [];
  intentPanel = [];
  visitorsPanel = [];
  feedbacksPanel = [];
  parsedData: Object;
  questionDisplay = true;
  visitorsDisplay = true;
  intentDisplay = false;
  feedbackDisplay = true;
  destroy$: Subject<boolean> = new Subject<boolean>();

  chartOptions: chartJs.ChartOptions = {
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
          callback: function(value) {
            // @ts-ignore
            if (value % 1 === 0) {
              return value;
            }
          }
        }
      }]
    }
  };
  chartData = [
    this._datasetQuestions, this._datasetIntents, this._datasetVisitors, this._datasetFeedbacks
  ];
  chartLabels = [];
  chartColors = [
    { // first color
      borderColor: '#40b374',
      pointBackgroundColor: '#40b374',
      pointBorderColor: '#fff',
    },
    { // second color
      borderColor: '#fd9397',
      pointBackgroundColor: '#fd9397',
      pointBorderColor: '#fff',
    },
    { // third color
      borderColor: '#ffa642',
      pointBackgroundColor: '#ffa642',
      pointBorderColor: '#fff',
    },
    { // fourth color
      borderColor: '#5436FF',
      pointBackgroundColor: '#5436FF',
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
        this.parsedData = this._parseData(result);
        this.parsedData['question'].forEach(elem => {
          this._fillDataset(this._datasetQuestions, elem);
        });
        this.parsedData['visitors'].forEach(elem => {
          this._fillDataset(this._datasetVisitors, elem);
        });
        this.parsedData['intents'].forEach(elem => {
          this._fillDataset(this._datasetIntents, elem);
        });
        this.parsedData['feedbacks'].forEach(elem => {
          this._fillDataset(this._datasetFeedbacks, elem);
        });

        this.questionsPanel = this.getPanelData(this._datasetQuestions.data, this.chartLabels);
        this.visitorsPanel = this.getPanelData(this._datasetVisitors.data, this.chartLabels);
        this.intentPanel = this.getPanelData(this._datasetIntents.data, this.chartLabels);
        this.feedbacksPanel = this.getPanelData(this._datasetFeedbacks.data, this.chartLabels);
        this.displayPanel();
      }
    );
  }

  private _fillDataset(dataset: any, elem: any) {
    const position = this.chartLabels.indexOf(elem.date) + 1;
    dataset.data[position] = Number(elem.count);
  }

  setXAxis(start, end) {
    const current = start ? new Date(start) : this.startDate;
    this._datasetQuestions.data = [];
    this._datasetVisitors.data = [];
    this._datasetIntents.data = [];
    this._datasetFeedbacks.data = [];
    this.chartLabels = [];
    while (current <= (end ? end : this.endDate)) {
      // Warning on this string
      this.chartLabels.push(current.toLocaleDateString('en-US'));
      this._datasetQuestions.data.push(0);
      this._datasetVisitors.data.push(0);
      this._datasetIntents.data.push(0);
      this._datasetFeedbacks.data.push(0);
      current.setDate(current.getDate() + 1);
    }
  }

  private _parseData(dataToParse) {
    const parsedData = {};
    this._fillParsedData(dataToParse, parsedData, 'askedQuestionsNumber', 'question');
    this._fillParsedData(dataToParse, parsedData, 'visitorNumber', 'visitors');
    this._fillParsedData(dataToParse, parsedData, 'dbQuestionSize', 'intents');
    this._fillParsedData(dataToParse, parsedData, 'feedbacksNumber', 'feedbacks');
    return parsedData;
  }

  private _fillParsedData(dataToParse: any, parsedData: any, name: string, attribute: string) {
    if (dataToParse[name]) {
      parsedData[attribute] = [];
      dataToParse[name].forEach(obj => {
        parsedData[attribute].push({
          date: new Date(obj['date'].substring(0, 10)).toLocaleDateString('en-US'),
          count: obj['count']
        });
      });
    }
  }

  getPanelData(values, dates) {
    const dataArray = [];
    dataArray['count'] = 0;
    values.forEach(elem => {
      dataArray['count'] = dataArray['count'] + Number(elem);
    });
    dataArray['maxNb'] = values.reduce((a, b) => Math.max(a, b));
    dataArray['minNb'] = values.reduce((a, b) => Math.min(a, b));
    dataArray['maxDay'] = moment(dates[(values.lastIndexOf(dataArray['maxNb']))]).format('dddd Do MMM YYYY');
    dataArray['minDay'] = moment(dates[(values.lastIndexOf(dataArray['minNb']))]).format('dddd Do MMM YYYY');

    return dataArray;
  }

  displayPanel() {
    this.chartData = [];
    this.questionDisplay ? this.chartData.push({...this._datasetQuestions}) :
      this.chartData.push(Object.assign({...this._datasetQuestions}, {data: []}));
    this.visitorsDisplay ? this.chartData.push({...this._datasetVisitors}) :
      this.chartData.push(Object.assign({...this._datasetVisitors}, {data: []}));
    this.intentDisplay ? this.chartData.push({...this._datasetIntents}) :
      this.chartData.push(Object.assign({...this._datasetIntents}, {data: []}));
    this.feedbackDisplay ? this.chartData.push({...this._datasetFeedbacks}) :
      this.chartData.push(Object.assign({...this._datasetFeedbacks}, {data: []}));
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
