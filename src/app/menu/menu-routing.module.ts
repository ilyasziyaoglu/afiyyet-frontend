import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {SubmenuComponent} from './submenu/submenu.component';
import {ItemComponent} from './item/item.component';
import {ReservationComponent} from './reservation/reservation.component';
import {MenuComponent} from './menu.component';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {path: '', redirectTo: 'categories', pathMatch: 'full'},
            {
                path: 'categories',
                component: CategoriesComponent,
            },
            {
                path: 'submenu',
                component: SubmenuComponent,
            },
            {
                path: 'item',
                component: ItemComponent,
            },
            {
                path: 'reservation',
                component: ReservationComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MenuRoutingModule {
}
