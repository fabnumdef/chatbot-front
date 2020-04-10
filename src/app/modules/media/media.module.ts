import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaLayoutComponent } from './media-layout/media-layout.component';
import { MediaRoutingModule } from './media.routing';
import { MediaListComponent } from './media-layout/media-list/media-list.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MediaFilterComponent } from './media-layout/media-filter/media-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MediaLayoutComponent, MediaListComponent, MediaFilterComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: Window, useValue: window},
  ]
})
export class MediaModule { }
