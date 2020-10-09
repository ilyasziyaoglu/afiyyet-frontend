import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuSessionService {

  CURRENT_PROD = "@currProdMenu";
  CURRENT_CAMP = "@currCampMenu";
  CURRENT_CATEGORY = "@currCatMenu";

  constructor() { }

  setCurrentProduct(product) {
    sessionStorage.setItem(this.CURRENT_PROD, JSON.stringify(product));
  }

  getCurrentProduct() {
    let product = sessionStorage.getItem(this.CURRENT_PROD);
    if (product) return JSON.parse(product);
    return null;
  }

  setCurrentCampaign(campaign) {
    sessionStorage.setItem(this.CURRENT_CAMP, JSON.stringify(campaign));
  }

  getCurrentCampaign() {
    let campaign = sessionStorage.getItem(this.CURRENT_CAMP);
    if (campaign) return JSON.parse(campaign);
    return null;
  }

  setCurrentCategory(category) {
    sessionStorage.setItem(this.CURRENT_CATEGORY, JSON.stringify(category));
  }

  getCurrentCategory() {
    let category = sessionStorage.getItem(this.CURRENT_CATEGORY);
    if (category) return JSON.parse(category);
    return null;
  }
}
