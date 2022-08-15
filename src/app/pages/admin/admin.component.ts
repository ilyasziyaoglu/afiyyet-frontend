import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../base/services/user.service';
import {featureType} from '../../services/models/FeatureTypes';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

    isLogged = false;

    constructor(
        public userService: UserService,
        public router: Router,
    ) {
        if ( userService.getUser() ) {
            this.isLogged = true;
        }

        const user = userService.getUser().user;
        if ( !user ) {
            router.navigateByUrl('login');
        }

        userService.isCampEnabled = user.brand.features.includes(featureType.CAMPAIGN);
        userService.isReportsEnabled = user.brand.features.includes(featureType.REPORTS);
        userService.isReservEnabled = user.brand.features.includes(featureType.RESERVATIONS);
        userService.isFeedBackEnabled = user.brand.features.includes(featureType.FEEDBACKS);
        userService.isOrderEnabled = user.brand.features.includes(featureType.ORDERING);
    }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logOut();
        this.isLogged = false;
        this.router.navigateByUrl('/pages/afiyyet/home');
    }

}
