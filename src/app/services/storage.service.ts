import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  favorites: string [];

  constructor() {
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) {
      const value = localStorage.getItem(keys[i]);
      try {
        this[keys[i]] = JSON.parse(value);
      } catch (e) {
        this[keys[i]] = value;
      }
    }
  }

  setItem(key: string, value: any) {
    this[key] = value;
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  updateItem(key) {
    this.setItem(key, this[key]);
  }
}
