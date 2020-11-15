import {NgModule} from '@angular/core';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SpinnerComponent} from './spinner/spinner.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        SpinnerComponent,
    ],
    imports: [
        FormsModule,
        MatSelectModule,
        RouterModule,
        FormsModule,
        MatCheckboxModule,
    ],
    exports: [
        SpinnerComponent,
    ],
})
export class BaseModule {
}
