import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { StatsRoutingModule } from './stats.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StatsListComponent } from './stats-list/stats-list.component';
import { StatsFilterComponent } from './stats-list/stats-filter/stats-filter.component';
import { StatsGraphComponent } from './stats-list/stats-graph/stats-graph.component';
import { StatsBestQuestionsComponent } from './stats-list/stats-best-questions/stats-best-questions.component';
import { StatsWorstQuestionsComponent } from './stats-list/stats-worst-questions/stats-worst-questions.component';
import { StatsKpiComponent } from './stats-list/stats-kpi/stats-kpi.component';
import { ChartsModule } from 'ng2-charts';
import { StatsBestCategoriesComponent } from './stats-list/stats-best-categories/stats-best-categories.component';


@NgModule({
  declarations: [
    StatsLayoutComponent,
    StatsListComponent,
    StatsFilterComponent,
    StatsGraphComponent,
    StatsBestQuestionsComponent,
    StatsWorstQuestionsComponent,
    StatsKpiComponent,
    StatsBestCategoriesComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class StatsModule { }
