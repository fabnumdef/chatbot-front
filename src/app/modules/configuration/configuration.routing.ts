import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationLayoutComponent } from './configuration-layout/configuration-layout.component';

const routes: Routes = [
  {path: '', component: ConfigurationLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {
}
