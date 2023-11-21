import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { StatsRoutingModule } from './stats.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { StatsListComponent } from './stats-list/stats-list.component';
import { StatsFilterComponent } from './stats-list/stats-filter/stats-filter.component';
import { StatsGraphComponent } from './stats-list/stats-graph/stats-graph.component';
import { StatsBestQuestionsComponent } from './stats-list/stats-best-questions/stats-best-questions.component';
import { StatsWorstQuestionsComponent } from './stats-list/stats-worst-questions/stats-worst-questions.component';
import { StatsKpiComponent } from './stats-list/stats-kpi/stats-kpi.component';
import { StatsBestCategoriesComponent } from './stats-list/stats-best-categories/stats-best-categories.component';
import { FaqStatsMostQuestionsComponent } from './stats-list/faq-stats-most-questions/faq-stats-most-questions.component';
import { FaqStatsMostCategoriesComponent } from './stats-list/faq-stats-most-categories/faq-stats-most-categories.component';
import { FaqStatsKpiComponent } from './stats-list/faq-stats-kpi/faq-stats-kpi.component';
import { FeedbacksStatsKpiComponent } from './stats-list/feedbacks-stats-kpi/feedbacks-stats-kpi.component';
import { FeedbacksStatsMostQuestionsComponent } from './stats-list/feedbacks-stats-most-questions/feedbacks-stats-most-questions.component';
import { FeedbacksStatsMostCategoriesComponent } from './stats-list/feedbacks-stats-most-categories/feedbacks-stats-most-categories.component';

@NgModule({
  declarations: [
    StatsLayoutComponent,
    StatsListComponent,
    StatsFilterComponent,
    StatsGraphComponent,
    StatsBestQuestionsComponent,
    StatsWorstQuestionsComponent,
    StatsKpiComponent,
    StatsBestCategoriesComponent,
    FaqStatsMostQuestionsComponent,
    FaqStatsMostCategoriesComponent,
    FaqStatsKpiComponent,
    FeedbacksStatsKpiComponent,
    FeedbacksStatsMostQuestionsComponent,
    FeedbacksStatsMostCategoriesComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  providers: [
  ]
})
export class StatsModule { }
