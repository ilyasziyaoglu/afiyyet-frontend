import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: '', redirectTo: 'afiyyet', pathMatch: 'full'},
            {path: 'afiyyet', loadChildren: () => import('./afiyyet/afiyyet.module').then(m => m.AfiyyetModule)},
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
