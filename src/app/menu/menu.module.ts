import {NgModule} from '@angular/core';

import {MenuRoutingModule} from './menu-routing.module';
import {MenuComponent} from './menu.component';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ReservationComponent} from './reservation/reservation.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        MenuComponent,
        CategoriesComponent,
        ProductsComponent,
        ProductDetailComponent,
        ReservationComponent,
    ],
    imports: [
        CommonModule,
        MenuRoutingModule,
        MatIconModule,
    ],
})
export class MenuModule {
}
