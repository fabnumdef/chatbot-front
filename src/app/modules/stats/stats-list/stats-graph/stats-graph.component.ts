import { Component, OnInit, ViewChild } from '@angular/core';
import { StatsService } from '@core/services/stats.service';
import { map } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';
import { graphDetailInOutAnimation } from '../../../shared/components/chatbot-list-item/chatbot-list-item.animation';
import * as moment from 'moment';
import 'moment/locale/fr';

@Component({
  selector: 'app-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss'],
  animations: [
    graphDetailInOutAnimation
  ]
})
export class StatsGraphComponent implements OnInit {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  data: any;
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
  intentDisplay = true;

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
    { data: [0], label: 'Questions posées', fill: false},
    { data: [0], label: 'Questions ajoutées', fill: false},
    { data: [0], label: 'Nb visiteurs', fill: false}
  ];
  chartLabels = [];
  chartColors = [
    { // first color
      borderColor: '#40b374',
      pointBackgroundColor: '#40b374',
      pointBorderColor: '#fff',
    },
    { // second color
      borderColor: '#fab754',
      pointBackgroundColor: '#fab754',
      pointBorderColor: '#fff',
    },
    { // third color
      borderColor: '#fab7b9',
      pointBackgroundColor: '#fab7b9',
      pointBorderColor: '#fff',
    }];

  constructor(private _statsService: StatsService) {
    this.startDate = new Date('2020-05-01');
    this.endDate = new Date('2020-06-01');
    moment.locale('fr');

    while (this.startDate <= this.endDate) {
      this.chartLabels.push(new Date(this.startDate.setDate(this.startDate.getDate() + 1)).toLocaleDateString('en-US'));
      this.dataset1.push(0);
      this.dataset2.push(0);
      this.dataset3.push(0);
    }
    this.data = this._statsService.getGraphData().pipe(map((response: any) => response));
    this.data.subscribe(
      (result) => {

        this.parsedData = this.parseData(result);
        this.parsedData['question'].forEach(elem => {
          const position = this.chartLabels.indexOf(elem.date);
          this.dataset1[position] = Number(elem.count);
        });
        this.parsedData['visitors'].forEach(elem => {
          const position = this.chartLabels.indexOf(elem.date);
          this.dataset2[position] = Number(elem.count);
        });
        this.parsedData['intents'].forEach(elem => {
          const position = this.chartLabels.indexOf(elem.date);
          this.dataset3[position] = Number(elem.count);
        });

        this.questionsPanel = this.getPanelData(this.dataset1, this.chartLabels);
        this.intentPanel = this.getPanelData(this.dataset3, this.chartLabels);
        this.visitorsPanel = this.getPanelData(this.dataset2, this.chartLabels);
        this.chartData = [];
        if (this.questionDisplay) {
          this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false });
        }
        if (this.intentDisplay) {
          this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false });
        }
        if (this.visitorsDisplay) {
          this.chartData.push({ data: this.dataset2, label: 'Nb visiteurs', fill: false});
        }
      }
    );
  }

  ngOnInit(): void {
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
      this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false });
    } else {
      this.chartData.push({ data: [], label: 'Questions posées', fill: false });
    }
    if (this.intentDisplay) {
      this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false });
    } else {
      this.chartData.push({ data: [], label: 'Questions ajoutées', fill: false });
    }
    if (this.visitorsDisplay) {
      this.chartData.push({ data: this.dataset2, label: 'Nb visiteurs', fill: false});
    } else {
      this.chartData.push({ data: [], label: 'Nb visiteurs', fill: false });
    }
    this.updateChart();
  }

  displayVisitorPanel() {
    this.visitorsDisplay = !this.visitorsDisplay;
    this.chartData = [];
    if (this.questionDisplay) {
      this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false });
    } else {
      this.chartData.push({ data: [], label: 'Questions posées', fill: false });
    }
    if (this.intentDisplay) {
      this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false });
    } else {
      this.chartData.push({ data: [], label: 'Questions ajoutées', fill: false });
    }
    if (this.visitorsDisplay) {
      this.chartData.push({ data: this.dataset2, label: 'Nb visiteurs', fill: false});
    } else {
      this.chartData.push({ data: [], label: 'Nb visiteurs', fill: false });
    }
    this.updateChart();
  }

  displayIntentPanel() {
    this.intentDisplay = !this.intentDisplay;
    this.chartData = [];
    if (this.questionDisplay) {
      this.chartData.push({ data: this.dataset1, label: 'Questions posées', fill: false });
    } else {
      this.chartData.push({ data: [], label: 'Questions posées', fill: false });
    }
    if (this.intentDisplay) {
      this.chartData.push({ data: this.dataset3, label: 'Questions ajoutées', fill: false });
    } else {
      this.chartData.push({ data: [], label: 'Questions ajoutées', fill: false });
    }
    if (this.visitorsDisplay) {
      this.chartData.push({ data: this.dataset2, label: 'Nb visiteurs', fill: false});
    } else {
      this.chartData.push({ data: [], label: 'Nb visiteurs', fill: false });
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

  download(){
    const btn: HTMLElement = document.getElementById('downloadGraphBtn');
    btn.click();
  }
}
