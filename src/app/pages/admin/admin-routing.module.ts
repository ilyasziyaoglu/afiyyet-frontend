import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationsComponent} from './reservations/reservations.component';
import {CommentsComponent} from './comments/comments.component';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {MenuComponent} from './menu/menu.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {AdminComponent} from './admin.component';
import {ReportsComponent} from './reports/reports.component';
import {CampaignEditComponent} from './campaign-edit/campaign-edit.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {
                path: 'menu',
                component: MenuComponent,
            },
            {
                path: 'item-edit',
                component: ItemEditComponent,
            },
            {
                path: 'campaign-edit',
                component: CampaignEditComponent
            },
            {
                path: 'reservations',
                component: ReservationsComponent,
            },
            {
                path: 'comments',
                component: CommentsComponent,
            },
            {
                path: 'campaigns',
                component: CampaignsComponent,
            },
            {
                path: 'reports',
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
