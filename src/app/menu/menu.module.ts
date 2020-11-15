import {NgModule} from '@angular/core';

import {MenuRoutingModule} from './menu-routing.module';
import {MenuComponent} from './menu.component';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ReservationComponent} from './reservation/reservation.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatBadgeModule} from '@angular/material/badge';
import {CampaignDetailComponent} from './campaign-detail/campaign-detail.component';
import {BaseModule} from '../base/base.module';
import { FavouritesComponent } from './favourites/favourites.component';
import {MatButtonModule} from '@angular/material/button';
import {BasketComponent} from './basket/basket.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DialogBasketCommentComponent} from './dialog-basket-comment/dialog-basket-comment.component';


@NgModule({
    declarations: [
        MenuComponent,
        CategoriesComponent,
        ProductsComponent,
        ProductDetailComponent,
        ReservationComponent,
        CampaignDetailComponent,
        FavouritesComponent,
        BasketComponent,
        DialogBasketCommentComponent
    ],
    imports: [
        CommonModule,
        MenuRoutingModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        NgxMaterialTimepickerModule,
        MatBadgeModule,
        BaseModule,
        MatButtonModule,
        MatCheckboxModule,
    ],
})
export class MenuModule {
}
