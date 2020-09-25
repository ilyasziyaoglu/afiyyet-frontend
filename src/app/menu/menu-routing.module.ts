import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
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
                component: ProductsComponent,
            },
            {
                path: 'item',
                component: ProductDetailComponent,
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
