import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxLayoutComponent } from './inbox-layout/inbox-layout.component';
import { InboxRoutingModule } from './inbox.routing';
import { InboxFilterComponent } from './inbox-layout/inbox-filter/inbox-filter.component';
import { InboxListComponent } from './inbox-layout/inbox-list/inbox-list.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InboxLayoutComponent,
    InboxFilterComponent,
    InboxListComponent
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InboxModule {
}
