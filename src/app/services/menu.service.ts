import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {MenuLocalService} from '../base/services/menu-local.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService extends BaseService {

    basePath = 'menu';

    currentBrand: any;
    currentCategory: any;
    currentCampaign: any;
    currentProduct: any;

    menu: any;

    isLikeEnabled = false;
    isFavEnabled = false;
    isCampEnabled = false;
    isFeedBackEnabled = false;
    isReservEnabled = false;
    isBasketEnabled = true;

    constructor(
        httpService: HttpService,
        private menuLocalService: MenuLocalService,
    ) {
        super(httpService);
    }

    getBasePath(): string {
        return this.basePath;
    }

    getMenu(brandName, cb?) {
        this.currentBrand = brandName;
        if ( this.menu && cb ) {
            cb();
        } else {
            this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/${brandName}`, '', result => {
                this.menu = result;
                if ( cb ) {
                    cb();
                }
            });
        }
    }

    like(item: any) {
        const postfix = 'product-like';
        if ( this.menuLocalService.getLikes().includes(item.id) ) {
            this.menuLocalService.removeLike(item.id);
            item.likes --;
            this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/${postfix}`, {itemId: item.id, like: false}, result => {
                if ( !result ) {
                    this.menuLocalService.addLike(item.id);
                    item.likes ++;
                }
            });
        } else {
            this.menuLocalService.addLike(item.id);
            item.likes ++;
            this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/${postfix}`, {itemId: item.id, like: true}, result => {
                if ( !result ) {
                    this.menuLocalService.removeLike(item.id);
                    item.likes --;
                }
            });
        }
    }

    getMostPopulars() {
        const likeMap = [];
        this.menu.categories.forEach(c => {
            c.products.forEach(p => {
                p.categoryName = c.name;
                likeMap.push({id: p.id, likes: p.likes, product: p});
            });
        });
        return likeMap.sort((a, b) => b.likes - a.likes).map(i => {return i.product});
    }
}
