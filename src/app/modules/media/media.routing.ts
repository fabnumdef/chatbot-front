import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaLayoutComponent } from './media-layout/media-layout.component';
import { MediaListComponent } from './media-list/media-list.component';

const routes: Routes = [
  {
    path: '',
    component: MediaLayoutComponent,
    children: [
      {path: '', component: MediaListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {
}
