import { DestroyObservable } from '@core/utils/destroy-observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import * as shape from 'd3-shape';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent extends DestroyObservable implements OnInit {

  startDate: Date;
  endDate: Date;

  private _datasetQuestions = {series: [], name: 'Questions posées'};
  private _datasetIntents = {series: [], name: 'Questions ajoutées'};
  private _datasetVisitors = {series: [], name: 'Nb sessions'};
  private _datasetFeedbacks = {series: [], name: 'Retours utilisateurs'};

  questionsPanel = [];
  intentPanel = [];
  visitorsPanel = [];
  feedbacksPanel = [];
  questionDisplay = true;
  visitorsDisplay = true;
  intentDisplay = false;
  feedbackDisplay = true;

  curve = shape.curveMonotoneX;
  chartDataBis: any[];
  dataUrl: string;

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
    this.startDate = dates?.startDate ? moment(dates.startDate, 'DD/MM/yyyy').toDate() : moment().subtract(1, 'month').toDate();
    this.endDate = dates?.endDate ? moment(dates.endDate, 'DD/MM/yyyy').toDate() : moment().toDate();
    if (this.startDate > this.endDate) {
      this.startDate = this.endDate;
    }

    this._statsService.getGraphData().subscribe(
      (result) => {
        this._fillDataset(this._datasetQuestions, result['askedQuestionsNumber'], this.startDate, this.endDate);
        this._fillDataset(this._datasetVisitors, result['visitorNumber'], this.startDate, this.endDate);
        this._fillDataset(this._datasetIntents, result['dbQuestionSize'], this.startDate, this.endDate);
        this._fillDataset(this._datasetFeedbacks, result['feedbacksNumber'], this.startDate, this.endDate);

        this.questionsPanel = this.getPanelData(this._datasetQuestions.series);
        this.visitorsPanel = this.getPanelData(this._datasetVisitors.series);
        this.intentPanel = this.getPanelData(this._datasetIntents.series);
        this.feedbacksPanel = this.getPanelData(this._datasetFeedbacks.series);
        this.displayPanel();
      }
    );
  }

  private _fillDataset(dataset: any, elem: any[], start, end) {
    const current = start ? new Date(start) : this.startDate;
    end = moment(end).set({hour: 0, minute: 0, second: 0, millisecond: 0});
    dataset.series = [];

    elem.map(e => {
      e.date = moment(e.date);
      return e;
    });

    while (moment(current).set({hour: 0, minute: 0, second: 0, millisecond: 0}).diff(end, 'days') <= 0) {
      const value = elem.find(e => e.date.isSame(moment(current), 'day'));
      // Warning on this string
      dataset.series.push({
        value: value ? Number(value.count) : 0,
        name: moment(current).set({hour: 0, minute: 0, second: 0, millisecond: 0}).toISOString()
      });
      current.setDate(current.getDate() + 1);
    }
  }

  getPanelData(values) {
    const dataArray = [];
    dataArray['count'] = 0;
    values.forEach(elem => {
      dataArray['count'] = dataArray['count'] + Number(elem.value);
    });
    dataArray['maxNb'] = values.reduce((a, b) => Math.max(a && a.value !== undefined ? a.value : a, b.value));
    dataArray['minNb'] = values.reduce((a, b) => Math.min(a && a.value !== undefined ? a.value : a, b.value));

    dataArray['maxDay'] = moment(values[values.findIndex(v => v.value === dataArray['maxNb'])].name).format('dddd Do MMM YYYY');
    dataArray['minDay'] = moment(values[values.findIndex(v => v.value === dataArray['minNb'])].name).format('dddd Do MMM YYYY');

    return dataArray;
  }

  displayPanel() {
    this.chartDataBis = [];

    this.questionDisplay ? this.chartDataBis.push({...this._datasetQuestions}) :
      this.chartDataBis.push(Object.assign({...this._datasetQuestions}, {series: []}));
    this.visitorsDisplay ? this.chartDataBis.push({...this._datasetVisitors}) :
      this.chartDataBis.push(Object.assign({...this._datasetVisitors}, {series: []}));
    this.intentDisplay ? this.chartDataBis.push({...this._datasetIntents}) :
      this.chartDataBis.push(Object.assign({...this._datasetIntents}, {series: []}));
    this.feedbackDisplay ? this.chartDataBis.push({...this._datasetFeedbacks}) :
      this.chartDataBis.push(Object.assign({...this._datasetFeedbacks}, {series: []}));
  }

  downloadCanvas(event) {
    const anchor = event.target;
    const name = 'globalStats-' + moment(new Date()).format('DDMMYYYYHHmmss') + '.jpg';
    // get the canvas
    anchor.href = this.dataUrl;
    anchor.download = name;
  }

  async download() {
    // Get the chart
    const node = document.getElementsByClassName('ngx-charts-outer')[0];
    this.dataUrl = await domtoimage.toPng(node);

    const btn: HTMLElement = document.getElementById('downloadGraphBtn');
    btn.click();
  }

  barColors(e) {
    switch (e) {
      case 'Questions posées':
        return '#22aa6d';
      case 'Questions ajoutées':
        return '#ef6c00';
      case 'Nb sessions':
        return '#f06292';
      case 'Retours utilisateurs':
        return '#18a0fb';
    }
  }

  dateTickFormatting(val: any): string {
    return moment(val).format('DD/MM');
  }
}
