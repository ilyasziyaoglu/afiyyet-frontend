import {NgModule} from '@angular/core';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {AdminModule} from './admin/admin.module';
import {SmartmenuModule} from './smartmenu/smartmenu.module';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [PagesComponent],
    imports: [
        PagesRoutingModule,
        AdminModule,
        SmartmenuModule,
        MatIconModule,
        CommonModule,
    ],
})
export class PagesModule {
}
