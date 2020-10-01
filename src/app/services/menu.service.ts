import {Injectable} from '@angular/core';
import {StorageService} from '../base/services/storage.service';
import {menu} from './models/data';
import {ProductService} from './product.service';
import {CategoryService} from './category.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService {

    serviceMenu;

    constructor(
        private storageService: StorageService,
        private categoryService: CategoryService,
        private productService: ProductService,
    ) {
        if ( !this.storageService.getItem('menu') ) {
            this.storageService.setItem('menu', menu);
        }
        this.serviceMenu = this.storageService.getItem('menu');
        this.setCampaigns();
        //
        // this.serviceMenu.categories.forEach(c => {
        // categoryService.post(c, result => {
        //     if ( result ) {
        //         console.info("Kategori basari ile eklendi.");
        //         c.items.forEach(i => {
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
        this.storageService.setItem('menu', this.serviceMenu);
    }

    setCampaigns() {
        const campaigns = [];
        for (let i = 0; i < 4; i ++) {
            const campItem = menu.categories[i].items[0];
            campItem.startDate = '05.09.2020';
            campItem.endDate = '18.12.2020';
            campaigns.push(campItem);
        }
        menu.campaigns = campaigns;
    }
}
