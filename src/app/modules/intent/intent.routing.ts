import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntentLayoutComponent } from './intent-layout/intent-layout.component';
import { IntentFileComponent } from './intent-file/intent-file.component';

const routes: Routes = [
  {path: '', component: IntentLayoutComponent},
  {path: 'fichier', component: IntentFileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntentRoutingModule {
}
