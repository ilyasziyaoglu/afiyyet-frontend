import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportingRoutingModule} from "./reporting-routing.module";
import {OrdersComponent} from "./orders/orders.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReportingRoutingModule,
        OrdersComponent,
        OrderDetailComponent,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class ReportingModule {
}
