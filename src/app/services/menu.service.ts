import {Injectable} from '@angular/core';
import {SessionService} from '../base/services/session.service';
import {menu} from './models/data';
import {ProductService} from './product.service';
import {CategoryService} from './category.service';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService extends BaseService {

    basePath = 'menu';

    currentBrand: any;
    currentCategory: any;
    currentProduct: any;
    currentCampaign: any;

    menu: any;

    constructor(
        httpService: HttpService,
        private storageService: SessionService,
        private categoryService: CategoryService,
        private productService: ProductService
    ) {
        super(httpService);

        // this.getMenu('brand1');

        // GET MOCK DATA
        // if ( !this.storageService.getItem('menu') ) {
        //     this.storageService.setItem('menu', menu);
        // }
        // this.menu = this.storageService.getItem('menu');
        // this.setCampaigns();


        // IMPORT MOCK DATA TO DB
        // this.menu.categories.forEach(c => {
        // categoryService.post(c, result => {
        //     if ( result ) {
        //         console.info("Kategori basari ile eklendi.");
        //         c.products.forEach(i => {
        //             i.category = result;
        //             productService.post(i, result2 => {
        //                 if (result2 ) {
        //                     console.info("Urun basari ile eklendi.");
        //                 } else {
        //                     console.error("Urun eklenemedi!");
        //                 }
        //             });
        //         });
        //         } else {
        //             console.error("Category eklenemedi!");
        //         }
        //     });
        // });
    }

    getBasePath(): string {
        return this.basePath;
    }

    getMenu(brandName) {
        this.currentBrand = brandName;
        this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/${brandName}`, '', result => {
            this.menu = result;
        });
    }

    like(item: any) {
        const likes = this.storageService.getItem('likes') || [];
        if ( likes.includes(item.id) ) {
            likes.splice(likes.indexOf(item.id), 1);
            item.likes --;
        } else {
            likes.push(item.id);
            item.likes ++;
        }
        this.storageService.setItem('likes', likes);
        this.storageService.setItem('menu', this.menu);
    }

    setCampaigns() {
        const campaigns = [];
        for (let i = 0; i < 4; i ++) {
            const campItem = menu.categories[i].products[0];
            campItem.startDate = '05.09.2020';
            campItem.endDate = '18.12.2020';
            campaigns.push(campItem);
        }
        menu.campaigns = campaigns;
    }
}
