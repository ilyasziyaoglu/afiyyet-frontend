import {Component} from '@angular/core';
import {HttpMethod, HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    username;
    password;
    isRememberCheck = false;

    constructor(
        private httpService: HttpService,
        private router: Router,
        private userService: UserService
    ) {
    }


    onLogin() {
        const data = {
            email: this.username,
            password: this.password,
        };
        this.httpService.doRequest(HttpMethod.POST, 'auth/login', data, (res) => {
            if ( res ) {
                this.userService.login(res.userResponse, res.token, this.isRememberCheck);
                this.router.navigateByUrl('pages/admin/menu');
            } else {
              Swal.fire('Uyarı!', 'Kullanıcı adı veya şifre hatalı.', 'warning');
            }
        });
    }
}
