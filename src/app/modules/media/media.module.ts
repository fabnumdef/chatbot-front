import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaLayoutComponent } from './media-layout/media-layout.component';
import { MediaRoutingModule } from './media.routing';
import { MediaListComponent } from './media-layout/media-list/media-list.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MediaLayoutComponent, MediaListComponent],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MediaModule { }
