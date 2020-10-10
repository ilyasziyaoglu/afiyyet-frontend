import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../base/services/user.service';
import {featureType} from '../../services/models/FeatureTypes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isCampEnabled = false;
  isReportsEnabled = false;
  isReservEnabled = false;
  isFeedBackEnabled = false;

  constructor(userService: UserService, router: Router) {
    if (!userService.getUser()) router.navigateByUrl('login');
    //this.isCampEnabled = menuService.menu.brand.features.includes(featureType.CAMPAIGN);
    //this.isReportsEnabled = menuService.menu.brand.features.includes(featureType.REPORTS);
    //this.isReservEnabled = menuService.menu.brand.features.includes(featureType.RESERVATIONS);
    //this.isFeedBackEnabled = menuService.menu.brand.features.includes(featureType.FEEDBACKS);
  }

  ngOnInit(): void {
  }

}
