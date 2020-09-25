import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationsComponent} from './reservations/reservations.component';
import {CommentsComponent} from './comments/comments.component';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {MenuComponent} from './menu/menu.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {AdminComponent} from './admin.component';
import {ReportsComponent} from './reports/reports.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'menu-edit', pathMatch: 'full'},
            {
                path: 'menu-edit',
                component: MenuComponent,
            },
            {
                path: 'item-edit',
                component: ItemEditComponent,
            },
            {
                path: 'admin-reservations',
                component: ReservationsComponent,
            },
            {
                path: 'admin-comments',
                component: CommentsComponent,
            },
            {
                path: 'admin-campaigns',
                component: CampaignsComponent,
            },
            {
                path: 'admin-reports',
                component: ReportsComponent,
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
