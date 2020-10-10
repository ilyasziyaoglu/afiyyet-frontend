import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdminSessionService {

    category: any;
    USER = "@user";
    CURRENT_PROD = "@currProdAdmin";
    CURRENT_CAMP = "@currCampAdmin";

    constructor() {}

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

    setCurrentCampaign(campaign, isEdit) {
        sessionStorage.setItem(this.CURRENT_CAMP, JSON.stringify({campaign, isEdit}));
    }

    getCurrentCampaign() {
        let campaign = sessionStorage.getItem(this.CURRENT_CAMP);
        if (campaign) return JSON.parse(campaign);
        return null;
    }
}