import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {OrdersComponent} from "./orders/orders.component";
import {ReportingComponent} from "./reporting.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";


const routes: Routes = [
  {
    path: '',
    component: ReportingComponent,
    children: [
      {path: '', redirectTo: 'orders', pathMatch: 'full'},
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'order-detail',
        component: OrderDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingRoutingModule { }
