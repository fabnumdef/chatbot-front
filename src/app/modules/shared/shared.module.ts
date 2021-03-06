import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotListItemComponent } from './components/chatbot-list-item/chatbot-list-item.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { HasRoleDirective } from './directives/has-role.directive';
import { SelectPaginationElementsComponent } from './components/select-pagination-elements/select-pagination-elements.component';

@NgModule({
  declarations: [
    ChatbotListItemComponent,
    ConfirmDialogComponent,
    PageHeaderComponent,
    PaginationComponent,
    ReversePipe,
    HasRoleDirective,
    SelectPaginationElementsComponent
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
    ReversePipe,
    HasRoleDirective,
    SelectPaginationElementsComponent
  ]
})
export class SharedModule { }
