import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaLayoutComponent } from './media-layout/media-layout.component';
import { MediaRoutingModule } from './media.routing';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MediaListComponent } from './media-list/media-list.component';
import { MediaFilterComponent } from './media-list/media-filter/media-filter.component';
import { MediaIntentsComponent } from './media-list/media-intents/media-intents.component';
import { ReplaceMediaComponent } from './media-list/replace-media/replace-media.component';
import { MediaEditComponent } from './media-list/media-edit/media-edit.component';

@NgModule({
  declarations: [
    MediaLayoutComponent,
    MediaListComponent,
    MediaFilterComponent,
    MediaIntentsComponent,
    ReplaceMediaComponent,
    MediaEditComponent
  ],
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
export class MediaModule {
}
