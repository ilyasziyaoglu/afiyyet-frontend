import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {CategoryService} from './category.service';
import {ProductService} from './product.service';
import {menu} from './models/egekahvecisi_data';
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
        // private categoryService: CategoryService,
        // private productService: ProductService,
    ) {
        super(httpService);
        //
        // // GET MOCK DATA
        // this.menu = menu;
        //
        // // IMPORT MOCK DATA TO DB
        // this.menu.categories.forEach(c => {
        //     categoryService.insertCategory(c, result => {
        //         if ( result ) {
        //             console.info('Kategori basari ile eklendi.');
        //             c.products.forEach(i => {
        //                 productService.insert(result, i, result2 => {
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
        return likeMap.sort((a, b) => b.likes - a.likes).slice(0, 5).map(i => {return i.product});
    }
}
