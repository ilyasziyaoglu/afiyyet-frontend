import {Component, OnInit} from '@angular/core';
import {HttpMethod, HttpService} from '../../services/http.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserService} from '../../services/user.service';

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
    private userService: UserService
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

      this.httpService.doRequest(HttpMethod.POST, 'auth/register', data, (res) => {
        if ( res ) {
          this.userService.register(res.userResponse, res.token);
          this.router.navigateByUrl('pages/admin/tables');
        } else {
          Swal.fire('Uyarı!', 'Kayıt başarısız. Lütfen bilgilerinizi kontrol ediniz.', 'warning');
        }
      });
    }
  }
}
