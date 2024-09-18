import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../base/services/user.service';

@Component({
  selector: 'app-afiyyet',
  templateUrl: './afiyyet.component.html',
  styleUrls: ['./afiyyet.component.scss']
})
export class AfiyyetComponent implements OnInit {

  isLogged = false;

  constructor(
      public router: Router,
      private userService: UserService
  ) {
    if (userService.getUser()) { this.isLogged = true; }
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior:"smooth"});
  }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logOut();
    this.isLogged = false;
    this.router.navigateByUrl('/pages/afiyyet/home');
  }

}
