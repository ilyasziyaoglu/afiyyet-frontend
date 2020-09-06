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

@NgModule({
  declarations: [
    AppComponent,
    SubmenuComponent,
    MenuComponent,
    ItemComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
    ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
