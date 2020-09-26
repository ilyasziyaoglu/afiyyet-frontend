import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    favorites: string[] = [];
    category: any;

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
}
