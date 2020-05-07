import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from '@core/components/authenticated-layout/authenticated-layout.component';
import { NotAuthenticatedLayoutComponent } from '@core/components/not-authenticated-layout/not-authenticated-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'inbox',
        loadChildren: () => import('./modules/inbox/inbox.module').then(m => m.InboxModule)
      },
      {
        path: 'connaissances',
        loadChildren: () => import('./modules/intent/intent.module').then(m => m.IntentModule)
      },
      {
        path: 'mediatheque',
        loadChildren: () => import('./modules/media/media.module').then(m => m.MediaModule)
      },
      {
        path: 'statistiques',
        loadChildren: () => import('./modules/stats/stats.module').then(m => m.StatsModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('./modules/configuration/configuration.module').then(m => m.ConfigurationModule)
      },
      {
        path: '',
        redirectTo: '/inbox',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    component: NotAuthenticatedLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
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
