import {Component} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {AdminSessionService} from '../../base/services/admin-session.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';
import {featureType} from '../../services/models/FeatureTypes';

@Component({
    selector: 'app-menu',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    isFavEnabled = false;

    constructor(
        public storageService: AdminSessionService,
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        private menuSessionService: MenuSessionService,
        public menuLocalService: MenuLocalService
    ) {
        //this.isFavEnabled = menuService.menu.brand.features.includes(featureType.FAVORITE);
    }

    onLike(item: any) {
        this.menuService.like(item);
    }

    productClick(product) {
        this.menuSessionService.setCurrentProduct(product);
    }

    campaignClick(campaign) {
        this.menuSessionService.setCurrentCampaign(campaign);
    }

    categoryClick(category) {
        this.menuSessionService.setCurrentCategory(category);
    }
}
