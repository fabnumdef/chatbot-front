import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from './core/components/authenticated-layout/authenticated-layout.component';
import { NotAuthenticatedLayoutComponent } from './core/components/not-authenticated-layout/not-authenticated-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'intents',
        loadChildren: () => import('./modules/intent/intent.module').then(m => m.IntentModule)
      },
      {
        path: '',
        redirectTo: '/intents',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    component: NotAuthenticatedLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    // { enableTracing : true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
