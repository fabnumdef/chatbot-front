import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPanZoomModule } from 'ngx-panzoom';
import { IntentRoutingModule } from './intent.routing';
import { IntentLayoutComponent } from './intent-layout/intent-layout.component';
import { MaterialModule } from '../material/material.module';
import { IntentFileComponent } from './intent-file/intent-file.component';
import { SharedModule } from '../shared/shared.module';
import { CreateEditIntentComponent } from './create-edit-intent/create-edit-intent.component';
import { WarningsDialogComponent } from './intent-file/warnings-dialog/warnings-dialog.component';
import { IntentFormComponent } from './create-edit-intent/intent-form/intent-form.component';
import { QuestionFormComponent } from './create-edit-intent/intent-form/question-form/question-form.component';
import { ResponseFormComponent } from './create-edit-intent/intent-form/response-form/response-form.component';
import { ImageFileFormComponent } from './create-edit-intent/intent-form/response-form/image-file-form/image-file-form.component';
import { FileItemComponent } from './create-edit-intent/intent-form/response-form/file-item/file-item.component';
import { MediaListDialogComponent } from './create-edit-intent/intent-form/response-form/media-list/media-list-dialog.component';
import { QuickReplyFormComponent } from './create-edit-intent/intent-form/response-form/quick-reply-form/quick-reply-form.component';
import { KnowledgeFormComponent } from './create-edit-intent/intent-form/knowledge-form/knowledge-form.component';
import { IntentFilterComponent } from './intent-list/intent-filter/intent-filter.component';
import { IntentListComponent } from './intent-list/intent-list.component';
import { FileFormComponent } from './create-edit-intent/intent-form/response-form/file-form/file-form.component';
import { IntentTreeComponent } from './intent-tree/intent-tree.component';
import { IntentTreeDialogComponent } from './intent-tree-modal/intent-tree-dialog.component';
import { IntentFullTreeComponent } from './intent-full-tree/intent-full-tree.component';
import { IntentTreeLeafComponent } from './intent-full-tree/intent-tree-leaf/intent-tree-leaf.component';
import { IntentTreeBranchComponent } from './intent-full-tree/intent-tree-branch/intent-tree-branch.component';
import { IntentPreviewResponseComponent } from './intent-full-tree/intent-preview-response/intent-preview-response.component';
import { CreateEditIntentDialogComponent } from './intent-full-tree/create-edit-intent-dialog/create-edit-intent-dialog.component';
import { IntentFinderDialogComponent } from './intent-full-tree/intent-finder-dialog/intent-finder-dialog.component';

@NgModule({
  declarations: [
    IntentListComponent,
    IntentFilterComponent,
    IntentLayoutComponent,
    IntentFileComponent,
    CreateEditIntentComponent,
    WarningsDialogComponent,
    IntentFormComponent,
    QuestionFormComponent,
    ResponseFormComponent,
    ImageFileFormComponent,
    FileItemComponent,
    MediaListDialogComponent,
    QuickReplyFormComponent,
    KnowledgeFormComponent,
    FileFormComponent,
    IntentTreeComponent,
    IntentTreeDialogComponent,
    IntentFullTreeComponent,
    IntentTreeLeafComponent,
    IntentTreeBranchComponent,
    IntentPreviewResponseComponent,
    CreateEditIntentDialogComponent,
    IntentFinderDialogComponent
  ],
  imports: [
    CommonModule,
    IntentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMatSelectSearchModule,
    NgxPanZoomModule
  ],
  providers: [
    {provide: Window, useValue: window},
  ],
  exports: [
    IntentFormComponent
  ]
})
export class IntentModule { }
