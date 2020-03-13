import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntentListComponent } from './intent-list/intent-list.component';

const routes: Routes = [{path: '', component: IntentListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntentRoutingModule {
}
