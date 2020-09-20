import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {SubmenuComponent} from './submenu/submenu.component';
import {ItemComponent} from './item/item.component';
import {AdminComponent} from './admin/admin.component';
import {ItemEditComponent} from './item-edit/item-edit.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './common/auth/login/login.component';
import {RegisterComponent} from './common/auth/register/register.component';
import {ReservationComponent} from './reservation/reservation.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'submenu',
    component: SubmenuComponent
  },
  {
    path: 'item',
    component: ItemComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'item-edit',
    component: ItemEditComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
