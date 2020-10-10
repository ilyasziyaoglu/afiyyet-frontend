import {Component} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';
import {featureType} from '../../services/models/FeatureTypes';

@Component({
    selector: 'app-menu',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
    isFavEnabled = true;
    isCampEnabled = false;

    constructor(
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        private menuSessionService: MenuSessionService,
        public menuLocalService: MenuLocalService
    ) {
        //this.isFavEnabled = menuService.menu.brand.features.includes(featureType.FAVORITE);
        //this.isCampEnabled = menuService.menu.brand.features.includes(featureType.CAMPAIGN);
    }

    onLike(item: any, isCampaign?) {
        this.menuService.like(item, isCampaign);
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
