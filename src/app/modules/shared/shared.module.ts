import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotListItemComponent } from './components/chatbot-list-item/chatbot-list-item.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UpdateChatbotComponent } from './components/update-chatbot/update-chatbot.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    ChatbotListItemComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    PaginationComponent,
    UpdateChatbotComponent,
    ReversePipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ChatbotListItemComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    PaginationComponent,
    UpdateChatbotComponent,
    ReversePipe
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
