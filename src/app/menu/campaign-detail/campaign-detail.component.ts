import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {FavoriteService} from '../../services/favorite.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent implements OnInit {

  currentCampaign;

  constructor(
      public menuLocalService: MenuLocalService,
      public menuService: MenuService,
      public favoriteService: FavoriteService,
      public menuSessionService: MenuSessionService
  ) {
    this.currentCampaign = menuSessionService.getCurrentCampaign();
  }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item, true);
  }

}
