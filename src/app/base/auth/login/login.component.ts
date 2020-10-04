import {Component} from '@angular/core';
import {HttpMethod, HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import {SessionService} from '../../services/session.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    username;
    password;

    constructor(
        private httpService: HttpService,
        private router: Router,
        private storageService: SessionService,
    ) {
    }


    onLogin() {
        const data = {
            email: this.username,
            password: this.password,
        };
        this.httpService.doRequest(HttpMethod.POST, 'auth/login', data, (res) => {
            if ( res ) {
                this.storageService.setItem('token', res.token);
                this.storageService.setItem('user', res.userResponse);
                this.router.navigateByUrl('pages/admin/menu');
            } else {
              Swal.fire('Uyarı!', 'Kullanıcı adı veya şifre hatalı.', 'warning');
            }
        });
    }
}
