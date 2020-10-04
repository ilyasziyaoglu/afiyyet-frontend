import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../base/services/user.service';
import {SessionService} from '../base/services/session.service';

@Component({
    selector: 'app-page',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

    isLogged = false;

    constructor(private router: Router,
                private userService: UserService,
                private storageService: SessionService) {
        if (storageService.getItem('user')) this.isLogged = true;
    }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logOut();
        this.isLogged = false;
        this.router.navigateByUrl('/pages/smartmenu/home');
    }
}
