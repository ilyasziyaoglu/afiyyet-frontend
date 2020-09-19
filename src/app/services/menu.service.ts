import {Injectable} from '@angular/core';
import {StorageService} from '../common/services/storage.service';
import {menu} from '../model/data';

@Injectable({
    providedIn: 'root',
})
export class MenuService {

    serviceMenu;

    constructor(
        private storageService: StorageService,
    ) {
        if ( !this.storageService.getItem('menu') ) {
            this.storageService.setItem('menu', menu);
        }
        this.serviceMenu = this.storageService.getItem('menu');
    }

    like(item: any) {
        const likes = this.storageService.getItem('likes') || [];
        if (likes.includes(item.id)) {
            likes.splice(likes.indexOf(item.id), 1);
            item.likes--;
        } else {
            likes.push(item.id);
            item.likes++;
        }
        this.storageService.setItem('likes', likes);
        this.storageService.setItem('menu', this.serviceMenu);
    }
}
