import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-kpi',
  templateUrl: './stats-kpi.component.html',
  styleUrls: ['./stats-kpi.component.scss']
})
export class StatsKpiComponent implements OnInit {

  visitors = 57;
  avgQuestionsPerUser = 4;
  avgResponseTime: Array<string> = ['8', 'secondes'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
