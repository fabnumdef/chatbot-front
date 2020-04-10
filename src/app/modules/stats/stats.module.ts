import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { StatsRoutingModule } from './stats.routing';

@NgModule({
  declarations: [StatsLayoutComponent],
  imports: [
    CommonModule,
    StatsRoutingModule
  ]
})
export class StatsModule { }
