import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationsComponent} from './reservations/reservations.component';
import {CommentsComponent} from './comments/comments.component';
import {CampaignsComponent} from './campaigns/campaigns.component';
import {MenuComponent} from './menu/menu.component';
import {AdminComponent} from './admin.component';
import {TablesComponent} from './tables/tables.component';
import {EditTableComponent} from './edit-table/edit-table.component';
import {TableDetailComponent} from './table-detail/table-detail.component';
import {ProductEditComponent} from './product-edit/product-edit.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {path: '', redirectTo: 'tables', pathMatch: 'full'},
            {
                path: 'tables',
                component: TablesComponent,
            },
            {
                path: 'menu',
                component: MenuComponent,
            },
            {
                path: 'edit-table',
                component: EditTableComponent,
            },
            {
                path: 'table-detail',
                component: TableDetailComponent,
            },
            {
                path: 'item-edit',
                component: ProductEditComponent,
            },
            {
                path: 'campaign-edit',
                component: ProductEditComponent
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
            {path: 'reports', loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule)},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}
