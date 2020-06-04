import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';

@Component({
  selector: 'app-stats-worst-questions',
  templateUrl: './stats-worst-questions.component.html',
  styleUrls: ['./stats-worst-questions.component.scss']
})
export class StatsWorstQuestionsComponent implements OnInit {

  worstQuestions: Array<string> = [
    'Quelles sont les conditions de travail avec la crise du coronavirus ?',
    'Comment poser mes congés ?',
    'Quelles sont les conditions pour déménager Outremer ?',
    'Comment changer de poste ?',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
    'Lorem ipsum est istes opus nexis orem ipsum est istes opus',
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
