import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsLayoutComponent } from './stats-layout/stats-layout.component';
import { StatsRoutingModule } from './stats.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StatsLayoutComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ]
})
export class StatsModule { }
