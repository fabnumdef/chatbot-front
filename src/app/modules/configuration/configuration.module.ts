import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationLayoutComponent } from './configuration-layout/configuration-layout.component';
import { ConfigurationRoutingModule } from './configuration.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConfigurationLayoutComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ConfigurationModule { }
