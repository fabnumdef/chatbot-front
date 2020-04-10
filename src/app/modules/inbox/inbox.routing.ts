import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxLayoutComponent } from './inbox-layout/inbox-layout.component';

const routes: Routes = [
  {path: '', component: InboxLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {
}
