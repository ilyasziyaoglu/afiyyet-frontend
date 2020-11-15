import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdminSessionService {

    category: any;
    USER = '@user';
    CURRENT_PROD = '@currProdAdmin';
    CURRENT_CAMP = '@currCampAdmin';
    CURRENT_CAT = '@currCatAdmin';
    CURRENT_TABLE = '@currentTableAdmin';

    constructor() {}

    setUser(user, token) {
        sessionStorage.setItem(this.USER, JSON.stringify({user, token}));
    }

    getUser() {
        const user = sessionStorage.getItem(this.USER);
        if (user) { return JSON.parse(user); }
        return null;
    }

    removeUser() {
        sessionStorage.removeItem(this.USER);
    }

    setCurrentProduct(product, isEdit) {
        sessionStorage.setItem(this.CURRENT_PROD, JSON.stringify({product, isEdit}));
    }

    getCurrentProduct() {
        const product = sessionStorage.getItem(this.CURRENT_PROD);
        if (product) { return JSON.parse(product); }
        return null;
    }

    setCurrentCampaign(campaign, isEdit) {
        sessionStorage.setItem(this.CURRENT_CAMP, JSON.stringify({campaign, isEdit}));
    }

    getCurrentCampaign() {
        const campaign = sessionStorage.getItem(this.CURRENT_CAMP);
        if (campaign) { return JSON.parse(campaign); }
        return null;
    }

    setCurrentCategoryId(categoryId) {
        sessionStorage.setItem(this.CURRENT_CAT, categoryId);
    }

    getCurrentCategoryId() {
        return sessionStorage.getItem(this.CURRENT_CAT);
    }

    setCurrentTable(table) {
        sessionStorage.setItem(this.CURRENT_TABLE, JSON.stringify(table));
    }

    getCurrentTable() {
        const table = sessionStorage.getItem(this.CURRENT_TABLE);
        if (table) { return JSON.parse(table); }
        return null;
    }
}
