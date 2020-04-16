import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationLayoutComponent } from './configuration-layout/configuration-layout.component';
import { ConfigurationRoutingModule } from './configuration.routing';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ConfigurationLayoutComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MaterialModule
  ]
})
export class ConfigurationModule { }
