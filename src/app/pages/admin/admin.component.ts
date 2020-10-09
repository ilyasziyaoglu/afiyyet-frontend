import { Component, OnInit } from '@angular/core';
import {AdminSessionService} from '../../base/services/admin-session.service';
import {Router} from '@angular/router';
import {UserService} from '../../base/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(userService: UserService, router: Router) {
    if (!userService.getUser()) {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
  }

}
