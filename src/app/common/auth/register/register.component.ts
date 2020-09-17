import { Component, OnInit } from '@angular/core';
import {HttpMethod, HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullName: any;
  email: any;
  password: any;
  password2: any;
  gender: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
  }

  onRegister() {
    if (this.password === this.password2) {
      const data = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      };

      this.httpService.doRequest(HttpMethod.POST, 'auth/register', data, (response) => {
        this.storageService.setItem('token', response.token);
        this.storageService.setItem('user', response.userResponse);
        this.router.navigateByUrl('/admin');
      });
    }
  }
}
