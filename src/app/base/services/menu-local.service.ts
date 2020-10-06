import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuLocalService {

  FAVS_KEY = "@favIds";

  constructor() { }

  addFavourite(favId) {
    let favs = this.getFavourites();
    favs.push(favId);
    this.setFavourites(favs);
  }

  removeFavourite(favId) {
    let favs = this.getFavourites();
    let index = favs.indexOf(favId);
    if (index > -1) favs.splice(index, 1);
    this.setFavourites(favs);
  }

  setFavourites(favIds) {
    localStorage.setItem(this.FAVS_KEY, JSON.stringify(favIds));
  }

  getFavourites() {
    let favs = localStorage.getItem(this.FAVS_KEY);
    if (favs) return JSON.parse(favs);
    return [];
  }
}
