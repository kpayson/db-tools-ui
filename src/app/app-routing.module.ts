import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { autoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
// import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
// import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
// import { AuthGuardService } from './Services/auth-guard.service';
// import { HomeComponent } from './components/home/home.component';
// import { NavigationComponent } from './components/navigation/navigation.component';

import { HomeComponent } from './home/home.component';

type PathMatch = "full" | "prefix" | undefined;

const routes = [
    // {
    //   path: 'auth-callback',
    //   component: AuthCallbackComponent
    // },
    // {
    //   path: 'auth-logout',
    //   component: AuthLogoutComponent
    // },
    // {
    //   path: '',
    //   component: NavigationComponent,
    //   data: { animation: 'isLeft' },
    //   children: [
    //     {
    //       path: 'home',
    //       component: HomeComponent
    //     },

    //     {
    //       path: '',
    //       redirectTo: 'home', pathMatch: 'full'
    //     }
    //   ]
    // },
    // {
    //   path: '',
    //   redirectTo: 'home', pathMatch: 'full'
    // },
    // {
    //   path: '**',
    //   redirectTo: 'home', pathMatch: 'full'
    // }
    
    {
        path:'home',
        component: HomeComponent
        // canActivate: [autoLoginPartialRoutesGuard]
    },

    { path: '', pathMatch: 'full' as PathMatch, redirectTo: 'home' },
    // { path: 'home', component: HomeComponent },
  ]

  @NgModule({
    imports: [RouterModule.forRoot(
      routes, 
      { 
        enableTracing: false,
        onSameUrlNavigation: 'reload' 
      })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

