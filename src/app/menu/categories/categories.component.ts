import {Component} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {MenuSessionService} from '../../base/services/menu-session.service';
import {MenuLocalService} from '../../base/services/menu-local.service';

@Component({
    selector: 'app-menu',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {

    constructor(
        public menuService: MenuService,
        public favoriteService: FavoriteService,
        private menuSessionService: MenuSessionService,
        public menuLocalService: MenuLocalService
    ) {}

    onLike(item: any, isCampaign?) {
        this.menuService.like(item, isCampaign);
    }

    productClick(product) {
        this.menuService.currentProduct = product
        this.menuSessionService.setCurrentProduct(product.id);
    }

    campaignClick(campaign) {
        this.menuService.currentCampaign = campaign;
        this.menuSessionService.setCurrentCampaign(campaign.id);
    }

    categoryClick(category) {
        this.menuService.currentCategory = category;
        this.menuSessionService.setCurrentCategory(category.id);
    }
}
