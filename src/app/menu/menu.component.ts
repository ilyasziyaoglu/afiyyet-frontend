import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DialogCommentComponent} from './dialog-comment/dialog-comment.component';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from '../services/menu.service';
import {FavoriteService} from '../services/favorite.service';
import {MenuSessionService} from '../base/services/menu-session.service';
import {featureType} from '../services/models/FeatureTypes';

@Component({
    selector: 'app-menus',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    isFavEnabled = false;
    isReservEnabled = false;
    isFeedBackEnabled = false;

    constructor(
        public location: Location,
        private dialog: MatDialog,
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        private menuSessionService: MenuSessionService
    ) {
        const currProdId = menuSessionService.getCurrentProduct();
        const currCatId = menuSessionService.getCurrentCategory();

        const brand = window.location.href.split('/')[5];
        if ( brand ) {
            this.menuService.getMenu(brand, () => {

                menuService.currentCampaign = menuService.menu.campaigns
                    .find(camp => camp.id === menuSessionService.getCurrentCampaign());

                menuService.currentProduct = menuService.menu.categories
                    .find(cat => cat.id === currCatId).products
                    .find(prod => prod.id === currProdId);

                menuService.currentCategory = menuService.menu.categories
                    .find(cat => cat.id === currCatId);

                menuService.isLikeEnabled = menuService.menu.brand.features.includes(featureType.LIKE);
                menuService.isFavEnabled = menuService.menu.brand.features.includes(featureType.FAVORITE);
                menuService.isCampEnabled = menuService.menu.brand.features.includes(featureType.CAMPAIGN);
                menuService.isFeedBackEnabled = menuService.menu.brand.features.includes(featureType.FEEDBACKS);
                menuService.isReservEnabled = menuService.menu.brand.features.includes(featureType.RESERVATIONS);
            });
        }
    }

    ngOnInit(): void {
    }

    commentClick() {
        this.dialog.open(DialogCommentComponent, {width: '85%'});
    }

}
