import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntentLayoutComponent } from './intent-layout/intent-layout.component';
import { IntentFileComponent } from './intent-file/intent-file.component';
import { CreateEditIntentComponent } from './create-edit-intent/create-edit-intent.component';
import { IntentListComponent } from './intent-layout/intent-list/intent-list.component';

const routes: Routes = [
  {
    path: '',
    component: IntentLayoutComponent,
    children: [
      {path: '', component: IntentListComponent},
      {path: 'creer', component: CreateEditIntentComponent},
      {path: 'fichier', component: IntentFileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntentRoutingModule {
}
