import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: '', redirectTo: 'smartmenu', pathMatch: 'full'},
            {path: 'smartmenu', loadChildren: () => import('./smartmenu/smartmenu.module').then(m => m.SmartmenuModule)},
            {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
