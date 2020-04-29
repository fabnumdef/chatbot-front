import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxLayoutComponent } from './inbox-layout/inbox-layout.component';
import { InboxListComponent } from './inbox-list/inbox-list.component';

const routes: Routes = [
  {
    path: '',
    component: InboxLayoutComponent,
    children: [
      {path: '', component: InboxListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {
}
