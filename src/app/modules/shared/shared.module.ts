import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotListItemComponent } from './components/chatbot-list-item/chatbot-list-item.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    ChatbotListItemComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ChatbotListItemComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    PaginationComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
