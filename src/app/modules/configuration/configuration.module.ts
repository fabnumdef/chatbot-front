import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationLayoutComponent } from './configuration-layout/configuration-layout.component';
import { ConfigurationRoutingModule } from './configuration.routing';



@NgModule({
  declarations: [ConfigurationLayoutComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
