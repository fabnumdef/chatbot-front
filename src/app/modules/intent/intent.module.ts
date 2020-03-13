import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntentListComponent } from './intent-list/intent-list.component';
import { IntentRoutingModule } from './intent.routing';



@NgModule({
  declarations: [IntentListComponent],
  imports: [
    CommonModule,
    IntentRoutingModule
  ]
})
export class IntentModule { }
