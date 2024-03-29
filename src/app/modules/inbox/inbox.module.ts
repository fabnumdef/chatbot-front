import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InboxLayoutComponent } from './inbox-layout/inbox-layout.component';
import { InboxRoutingModule } from './inbox.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { InboxFilterComponent } from './inbox-list/inbox-filter/inbox-filter.component';
import { InboxListComponent } from './inbox-list/inbox-list.component';
import { InboxIntentComponent } from './inbox-list/inbox-intent/inbox-intent.component';
import { InboxPreviewComponent } from './inbox-list/inbox-preview/inbox-preview.component';
import { IntentModule } from '../intent/intent.module';
import { InboxAssignationDialogComponent } from './inbox-list/inbox-assignation-dialog/inbox-assignation-dialog.component';

@NgModule({
  declarations: [
    InboxLayoutComponent,
    InboxFilterComponent,
    InboxListComponent,
    InboxIntentComponent,
    InboxPreviewComponent,
    InboxAssignationDialogComponent
  ],
  imports: [
    CommonModule,
    InboxRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    IntentModule
  ]
})
export class InboxModule {
}
