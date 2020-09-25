import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminReservationsComponent} from './admin-reservations/admin-reservations.component';
import {AdminCommentsComponent} from './admin-comments/admin-comments.component';
import {AdminCampaignsComponent} from './admin-campaigns/admin-campaigns.component';
import {AdminMenuComponent} from './admin-menu/admin-menu.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {AdminComponent} from './admin.component';
import {AdminReportsComponent} from './admin-reports/admin-reports.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'menu-edit', pathMatch: 'full'},
            {
                path: 'menu-edit',
                component: AdminMenuComponent,
            },
            {
                path: 'item-edit',
                component: ItemEditComponent,
            },
            {
                path: 'admin-reservations',
                component: AdminReservationsComponent,
            },
            {
                path: 'admin-comments',
                component: AdminCommentsComponent,
            },
            {
                path: 'admin-campaigns',
                component: AdminCampaignsComponent,
            },
            {
                path: 'admin-reports',
                component: AdminReportsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
