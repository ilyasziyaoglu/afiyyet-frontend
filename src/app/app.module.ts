import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ItemComponent } from './item/item.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { DialogCategoryNameComponent } from './dialog-category-name/dialog-category-name.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        SubmenuComponent,
        MenuComponent,
        ItemComponent,
        AdminComponent,
        ItemEditComponent,
        DialogCategoryNameComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        DragDropModule,
        MatDialogModule,
        FormsModule
    ],
    providers: [
        {provide : LocationStrategy , useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
