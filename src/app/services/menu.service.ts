import {Injectable} from '@angular/core';
import {StorageService} from '../base/services/storage.service';
import {menu} from './models/data';

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
        this.serviceMenu = this.setCampaigns(this.serviceMenu);
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

    setCampaigns(menu) {
        let campaigns = [];
        for (let i = 0; i < 4; i++) {
            let campItem = menu.categories[i].items[0];
            campItem.startDate = '05.09.2020';
            campItem.endDate = '18.12.2020';
            //campItem.name += ' Deneme Bakalim Hele Ne olacak sfdvs sdfv sdfv';
            campaigns.push(campItem);
        }
        menu.campaigns = campaigns;
        return menu;
    }
}
