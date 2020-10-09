import {NgModule} from '@angular/core';

import {SmartmenuRoutingModule} from './smartmenu-routing.module';
import {SmartmenuComponent} from './smartmenu.component';
import {HomeComponent} from './home/home.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        SmartmenuComponent,
        HomeComponent
    ],
    imports: [
        SmartmenuRoutingModule,
        MatListModule,
        MatIconModule,
        CommonModule,
    ],
})
export class SmartmenuModule {
}
