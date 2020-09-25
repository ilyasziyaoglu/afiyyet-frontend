import {NgModule} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        FormsModule,
        MatSelectModule,
        RouterModule,
        FormsModule,
        MatCheckboxModule,
    ],
})
export class BaseModule {
}
