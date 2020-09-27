import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../base/services/user.service';
import {StorageService} from '../base/services/storage.service';

@Component({
    selector: 'app-page',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

    isLogged = false;

    constructor(private router: Router,
                private userService: UserService,
                private storageService: StorageService) {
        if (storageService.getItem('user')) this.isLogged = true;
    }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logOut();
        this.router.navigateByUrl('/pages/smartmenu/home');
    }
}
