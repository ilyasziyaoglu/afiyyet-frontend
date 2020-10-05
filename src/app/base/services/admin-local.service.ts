import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminLocalService {

  USER = "@user";

  constructor() { }

  setUser(user, token) {
    localStorage.setItem(this.USER, JSON.stringify({user, token}));
  }

  getUser() {
    let user = localStorage.getItem(this.USER);
    if (user) return JSON.parse(user);
    return null;
  }

  removeUser() {
    localStorage.removeItem(this.USER);
  }
}
