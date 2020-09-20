import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SubmenuComponent} from './submenu/submenu.component';
import {MenuComponent} from './menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {ItemComponent} from './item/item.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AdminComponent} from './admin/admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from './common/common.module';
import { DialogCategoryEditComponent } from './dialogs/dialog-category-edit/dialog-category-edit.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DialogCommentComponent } from './dialogs/dialog-comment/dialog-comment.component';

@NgModule({
    declarations: [
        AppComponent,
        SubmenuComponent,
        MenuComponent,
        ItemComponent,
        AdminComponent,
        ItemEditComponent,
        HomeComponent,
        DialogCategoryEditComponent,
        ReservationComponent,
        DialogCommentComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        DragDropModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [
        {provide : LocationStrategy , useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
