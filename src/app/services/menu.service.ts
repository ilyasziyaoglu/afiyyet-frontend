import {Injectable} from '@angular/core';
import {Category} from '../model/models';
import {menu} from '../model/data';

@Injectable({
    providedIn: 'root',
})
export class MenuService {

    menu: any;

    constructor() {
        this.menu = menu;
    }

    getCategories() {
        return this.menu.categories;
    }
}
