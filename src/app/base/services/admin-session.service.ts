import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AdminSessionService {

    category: any;
    USER = '@user';
    CURRENT_PROD = '@currProdAdmin';
    CURRENT_CAT = '@currCatAdmin';

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

    setCurrentCategoryId(categoryId) {
        sessionStorage.setItem(this.CURRENT_CAT, categoryId);
    }

    getCurrentCategoryId() {
        return sessionStorage.getItem(this.CURRENT_CAT);
    }
}
