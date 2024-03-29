import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../base/services/user.service';

@Component({
    selector: 'app-page',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

    isLogged = false;

    constructor(
        public router: Router,
        private userService: UserService
    ) {
        if (userService.getUser()) { this.isLogged = true; }
    }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logOut();
        this.isLogged = false;
        this.router.navigateByUrl('/pages/afiyyet/home');
    }
}
