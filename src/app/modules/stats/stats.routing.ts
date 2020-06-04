import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { StatsListComponent } from './stats-list/stats-list.component';

const routes: Routes = [
  {
    path: '',
    component: StatsLayoutComponent,
    children: [
      {path: '', component: StatsListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule {
}
