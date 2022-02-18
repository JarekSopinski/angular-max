import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes:Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]},
    { 
      path: 'servers', 
      canActivateChild: [AuthGuard],
      component: ServersComponent, 
      children: [
      { path: ':id', component: ServerComponent },
      { 
        path: ':id/edit', 
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard] // will be activated whenever we try to leave this path
       }
    ]},
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' } // wildcard, should be last one
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule // we export configured RouterModule, to be imported in AppModule
    ]
})

export class AppRoutingModule {

}