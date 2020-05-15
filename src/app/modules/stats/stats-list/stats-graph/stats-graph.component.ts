import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent implements OnInit {

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    }
  };
  chartData = [
    { data: [120, 455, 100, 340, 260], label: 'Questions posées', fill: false },
    { data: [180, 240, 50, 320, 120], label: 'Questions ajoutées', fill: false },
    { data: [330, 600, 260, 700, 600], label: 'Nb visiteurs', fill: false}
  ];
  chartLabels = ['0', '7', '14', '21', '30'];
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

  constructor() {
  }

  ngOnInit(): void {
  }


}
