import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './base/auth/login/login.component';
import {RegisterComponent} from './base/auth/register/register.component';


const routes: Routes = [
    {path: '', redirectTo: 'pages', pathMatch: 'full'},
    {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
    {path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
