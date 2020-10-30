import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuLocalService {

  FAVS_KEY = '@favIds';
  LIKED_ITEMS_KEY = '@LikeIds';

  constructor() { }

  addFavourite(favId) {
    const favs = this.getFavourites();
    favs.push(favId);
    this.setFavourites(favs);
  }

  removeFavourite(favId) {
    const favs = this.getFavourites();
    const index = favs.indexOf(favId);
    if (index > -1) { favs.splice(index, 1); }
    this.setFavourites(favs);
  }

  setFavourites(favIds) {
    localStorage.setItem(this.FAVS_KEY, JSON.stringify(favIds));
  }

  getFavourites() {
    const favs = localStorage.getItem(this.FAVS_KEY);
    if (favs) { return JSON.parse(favs); }
    return [];
  }


  addLike(likeId) {
    const likes = this.getLikes();
    likes.push(likeId);
    this.setLikes(likes);
  }

  removeLike(likeId) {
    const likes = this.getLikes();
    const index = likes.indexOf(likeId);
    if (index > -1) { likes.splice(index, 1); }
    this.setLikes(likes);
  }

  setLikes(likeIds) {
    let key = this.LIKED_ITEMS_KEY;
    localStorage.setItem(key, JSON.stringify(likeIds));
  }

  getLikes() {
    let key = this.LIKED_ITEMS_KEY;
    const likes = localStorage.getItem(key);
    if (likes) { return JSON.parse(likes); }
    return [];
  }
}
