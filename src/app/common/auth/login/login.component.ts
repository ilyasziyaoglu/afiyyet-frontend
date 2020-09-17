import {Component} from '@angular/core';
import {HttpMethod, HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';

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
    private storageService: StorageService,
  ) {
  }


  onLogin() {
    const data = {
      email: this.username,
      password: this.password,
    };
    this.httpService.doRequest(HttpMethod.POST, 'auth/login', data, (response) => {
      this.storageService.setItem('token', response.token);
      this.storageService.setItem('user', response.userResponse);
      this.router.navigateByUrl('/admin');
    });
  }
}
