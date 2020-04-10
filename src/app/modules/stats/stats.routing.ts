import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';

const routes: Routes = [
  {path: '', component: StatsLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule {
}
