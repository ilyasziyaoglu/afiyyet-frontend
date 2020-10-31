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
    return favs ? JSON.parse(favs) : [];
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
    localStorage.setItem(this.LIKED_ITEMS_KEY, JSON.stringify(likeIds));
  }

  getLikes() {
    const likes = localStorage.getItem(this.LIKED_ITEMS_KEY);
    return likes ? JSON.parse(likes) : [];
  }
}
