import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaLayoutComponent } from './media-layout/media-layout.component';

const routes: Routes = [
  {path: '', component: MediaLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {
}
