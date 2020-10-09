import {Injectable} from '@angular/core';
import {AdminSessionService} from '../base/services/admin-session.service';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class MenuService extends BaseService {

    basePath = 'menu';

    currentBrand: any;
    currentCategory: any;

    menu: any;

    constructor(
        httpService: HttpService,
        private storageService: AdminSessionService
    ) {
        super(httpService);
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
    }
}
