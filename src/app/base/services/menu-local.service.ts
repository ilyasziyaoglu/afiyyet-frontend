import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuLocalService {

  FAVS_KEY = '@favIds';
  PROD_LIKE_KEY = '@prodLikeIds';
  CAMP_LIKE_KEY = '@campLikeIds';

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


  addLike(likeId, isCampaign?) {
    const likes = this.getLikes(isCampaign);
    likes.push(likeId);
    this.setLikes(likes, isCampaign);
  }

  removeLike(likeId, isCampaign?) {
    const likes = this.getLikes(isCampaign);
    const index = likes.indexOf(likeId);
    if (index > -1) { likes.splice(index, 1); }
    this.setLikes(likes, isCampaign);
  }

  setLikes(likeIds, isCampaign?) {
    let key = this.PROD_LIKE_KEY;
    if (isCampaign) { key = this.CAMP_LIKE_KEY; }
    localStorage.setItem(key, JSON.stringify(likeIds));
  }

  getLikes(isCampaign?) {
    let key = this.PROD_LIKE_KEY;
    if (isCampaign) { key = this.CAMP_LIKE_KEY; }
    const likes = localStorage.getItem(key);
    if (likes) { return JSON.parse(likes); }
    return [];
  }
}
