import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BaseModule} from './base/base.module';
import {MenuModule} from './menu/menu.module';
import {PagesModule} from './pages/pages.module';
import {ProductEditComponent} from './pages/admin/product-edit/product-edit.component';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatInputModule} from '@angular/material/input';
import {DialogBasketComponent} from './menu/dialog-basket/dialog-basket.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        DialogBasketComponent,
        ProductEditComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        BaseModule,
        MenuModule,
        PagesModule,
        MatIconModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        NgxMaterialTimepickerModule,
        MatInputModule,
        MatButtonModule,
    ],
    providers: [
        {provide : LocationStrategy , useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
