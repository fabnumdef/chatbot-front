import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatbotComponent } from './chatbot.component';

const routes: Routes = [
  {
    path: '',
    component: ChatbotComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatbotRoutingModule {
}
