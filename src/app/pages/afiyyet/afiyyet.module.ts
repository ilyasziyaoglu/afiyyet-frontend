import {NgModule} from '@angular/core';

import {AfiyyetRoutingModule} from './afiyyet-routing.module';
import {AfiyyetComponent} from './afiyyet.component';
import {HomeComponent} from './home/home.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
    declarations: [
        AfiyyetComponent,
        HomeComponent
    ],
    imports: [
        AfiyyetRoutingModule,
        MatListModule,
        MatIconModule,
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSidenavModule,
    ],
})
export class AfiyyetModule {
}
