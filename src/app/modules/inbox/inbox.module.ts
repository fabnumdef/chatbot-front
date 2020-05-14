import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxLayoutComponent } from './inbox-layout/inbox-layout.component';
import { InboxRoutingModule } from './inbox.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InboxFilterComponent } from './inbox-list/inbox-filter/inbox-filter.component';
import { InboxListComponent } from './inbox-list/inbox-list.component';
import { InboxIntentComponent } from './inbox-list/inbox-intent/inbox-intent.component';
import { InboxPreviewComponent } from './inbox-list/inbox-preview/inbox-preview.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { IntentModule } from '../intent/intent.module';

@NgModule({
  declarations: [
    InboxLayoutComponent,
    InboxFilterComponent,
    InboxListComponent,
    InboxIntentComponent,
    InboxPreviewComponent
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
