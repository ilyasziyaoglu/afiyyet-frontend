import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdminSessionService {

    favorites: string[] = [];
    category: any;
    USER = "@user";
    CURRENT_PROD = "@currProdAdmin";
    CURRENT_CAMP = "@currCampAdmin";

    constructor() {
        const keys = Object.keys(sessionStorage);
        let i = keys.length;

        while (i --) {
            const value = sessionStorage.getItem(keys[i]);
            try {
                this[keys[i]] = JSON.parse(value);
            } catch (e) {
                this[keys[i]] = value;
            }
        }
    }

    setItem(key: string, value: any) {
        this[key] = value;
        if ( typeof value !== 'string' ) {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    }

    getItem(key) {
        const item = sessionStorage.getItem(key);
        return item !== 'undefined' ? JSON.parse(item) : null;
    }

    removeItem(key) {
        sessionStorage.removeItem('edit-item');
    }

    updateItem(key) {
        this.setItem(key, this[key]);
    }

    setUser(user, token) {
        sessionStorage.setItem(this.USER, JSON.stringify({user, token}));
    }

    getUser() {
        let user = sessionStorage.getItem(this.USER);
        if (user) return JSON.parse(user);
        return null;
    }

    removeUser() {
        sessionStorage.removeItem(this.USER);
    }

    setCurrentProduct(product, isEdit) {
        sessionStorage.setItem(this.CURRENT_PROD, JSON.stringify({product, isEdit}));
    }

    getCurrentProduct() {
        let product = sessionStorage.getItem(this.CURRENT_PROD);
        if (product) return JSON.parse(product);
        return null;
    }

    removeCurrentProduct() {
        sessionStorage.removeItem(this.CURRENT_PROD);
    }

    setCurrentCampaign(campaign, isEdit) {
        sessionStorage.setItem(this.CURRENT_CAMP, JSON.stringify({campaign, isEdit}));
    }

    getCurrentCampaign() {
        let campaign = sessionStorage.getItem(this.CURRENT_CAMP);
        if (campaign) return JSON.parse(campaign);
        return null;
    }

    removeCurrentCampaign() {
        sessionStorage.removeItem(this.CURRENT_CAMP);
    }
}
