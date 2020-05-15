import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-best-questions',
  templateUrl: './stats-best-questions.component.html',
  styleUrls: ['./stats-best-questions.component.scss']
})
export class StatsBestQuestionsComponent implements OnInit {

  data = [
    { value: [346], question: 'Quelles sont les conditions de travail avec la crise du coronavirus ? ' },
    { value: [301], question: 'Comment poser mes congés ? '},
    { value: [120], question: 'Quelles sont les conditions pour déménager Outremer ? '},
    { value: [305], question: 'Qui es-tu ? '},
    { value: [352], question: 'Comment changer de poste ? '},
    { value: [301], question: 'Lorem ipsum est istes opus nexis orem ipsum est istes opus '},
    { value: [255], question: 'Lorem ipsum est istes opus nexis orem ipsum est istes opus '},
  ]
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
    tooltips: {
      enabled: true,
      callbacks: {
        title: function() {}
     }
    }
  };
  chartData = [
    { data: this.data[0].value, label: this.data[0].question },
    { data: this.data[1].value, label: this.data[1].question },
    { data: this.data[2].value, label: this.data[2].question },
    { data: this.data[3].value, label: this.data[3].question },
    { data: this.data[4].value, label: this.data[4].question },
    { data: this.data[5].value, label: this.data[5].question },
    { data: this.data[6].value, label: this.data[6].question },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

