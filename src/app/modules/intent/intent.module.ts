import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntentListComponent } from './intent-layout/intent-list/intent-list.component';
import { IntentRoutingModule } from './intent.routing';
import { IntentFilterComponent } from './intent-layout/intent-filter/intent-filter.component';
import { IntentLayoutComponent } from './intent-layout/intent-layout.component';
import { MaterialModule } from '../material/material.module';
import { IntentFileComponent } from './intent-file/intent-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IntentListComponent,
    IntentFilterComponent,
    IntentLayoutComponent,
    IntentFileComponent
  ],
  imports: [
    CommonModule,
    IntentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class IntentModule { }
