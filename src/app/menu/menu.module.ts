import {NgModule} from '@angular/core';

import {MenuRoutingModule} from './menu-routing.module';
import {MenuComponent} from './menu.component';
import {CategoriesComponent} from './categories/categories.component';
import {SubmenuComponent} from './submenu/submenu.component';
import {ItemComponent} from './item/item.component';
import {ReservationComponent} from './reservation/reservation.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        MenuComponent,
        CategoriesComponent,
        SubmenuComponent,
        ItemComponent,
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
