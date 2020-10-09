import { Component, OnInit } from '@angular/core';
import {AdminSessionService} from '../../base/services/admin-session.service';
import {MenuService} from '../../services/menu.service';
import {FavoriteService} from '../../services/favorite.service';
import {MenuSessionService} from '../../base/services/menu-session.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

  currentCampaign;

  constructor(
      public storageService: AdminSessionService,
      public menuService: MenuService,
      public favoriteService: FavoriteService,
      public menuSessionService: MenuSessionService
  ) {
    this.currentCampaign = menuSessionService.getCurrentCampaign();
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

}
