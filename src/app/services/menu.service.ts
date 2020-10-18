import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {CategoryService} from './category.service';
import {ProductService} from './product.service';
import {menu} from './models/data';
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

    constructor(
        httpService: HttpService,
        private menuLocalService: MenuLocalService,
        // private categoryService: CategoryService,
        // private productService: ProductService,
    ) {
        super(httpService);

        // GET MOCK DATA
        // this.menu = menu;

        // IMPORT MOCK DATA TO DB
        // this.menu.categories.forEach(c => {
        //     categoryService.post(c, result => {
        //         if ( result ) {
        //             console.info('Kategori basari ile eklendi.');
        //             c.products.forEach(i => {
        //                 i.category = result;
        //                 productService.post(i, result2 => {
        //                     if ( result2 ) {
        //                         console.info('Urun basari ile eklendi.');
        //                     } else {
        //                         console.error('Urun eklenemedi!');
        //                     }
        //                 });
        //             });
        //         } else {
        //             console.error('Category eklenemedi!');
        //         }
        //     });
        // });
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

    like(item: any, isCampaign?) {
        const postfix = isCampaign ? 'campaign-like' : 'product-like';
        if ( this.menuLocalService.getLikes(isCampaign).includes(item.id) ) {
            this.menuLocalService.removeLike(item.id, isCampaign);
            item.likes --;
            this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/${postfix}`, {itemId: item.id, like: false}, result => {
                if ( !result ) {
                    this.menuLocalService.addLike(item.id, isCampaign);
                    item.likes ++;
                }
            });
        } else {
            this.menuLocalService.addLike(item.id, isCampaign);
            item.likes ++;
            this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/${postfix}`, {itemId: item.id, like: true}, result => {
                if ( !result ) {
                    this.menuLocalService.removeLike(item.id, isCampaign);
                    item.likes --;
                }
            });
        }
    }
}
