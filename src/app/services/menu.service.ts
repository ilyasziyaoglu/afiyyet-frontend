import {Injectable} from '@angular/core';
import {StorageService} from '../common/services/storage.service';
import {menu} from '../model/data';

@Injectable({
    providedIn: 'root',
})
export class MenuService {

    serviceMenu;

    constructor(
        private storageService: StorageService
    ) {
        if (!this.storageService.getItem("menu")) {
            this.storageService.setItem("menu", menu);
        }
        this.serviceMenu = this.storageService.getItem("menu");
    }

    getCategories() {
        return this.serviceMenu.categories;
    }

    like(item: any) {
        let temp = this.storageService.getItem("menu");
        const likes = this.storageService.getItem('likes') || [];
        if (likes.includes(item.id)) {
            likes.splice(likes.indexOf(item.id), 1);
            item.likes--;
            temp.categories.map(category => {
                category = category.items.map(it => {
                    if (it.id === item.id) it.likes--;
                    return it;
                });
                return category;
            });
            this.storageService.setItem("menu", temp);
            this.serviceMenu = temp;

        } else {
            likes.push(item.id);
            item.likes++;
            temp.categories.map(category => {
                category = category.items.map(it => {
                    if (it.id === item.id) it.likes++;
                    return it;
                });
                return category;
            });
            this.storageService.setItem("menu", temp);
            this.serviceMenu = temp;
        }
        this.storageService.setItem('likes', likes);
    }
}
