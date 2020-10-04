import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpService } from './http.service';
import {SessionService} from './session.service';
import {LocalService} from './local.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
      private sessionService: SessionService,
      private localService: LocalService
  ) {
  }

  logOut() {
    this.localService.removeUser();
    this.sessionService.removeUser();
  }

  login(user, token, isRememberCheck) {
    if (isRememberCheck) {
      this.localService.setUser(user, token);
      this.sessionService.removeUser();
    } else {
      this.sessionService.setUser(user, token);
      this.localService.removeUser();
    }
  }

  register(user, token) {
    this.localService.setUser(user, token);
    this.sessionService.removeUser();
  }

  getUser() {
    if (this.localService.getUser()) {
      return this.localService.getUser();
    } else if (this.sessionService.getUser()) {
      return this.sessionService.getUser();
    } else {
      return false;
    }
  }

  getToken () {
    if (this.localService.getUser()) {
      return this.localService.getUser().token;
    } else if (this.sessionService.getUser()) {
      return this.sessionService.getUser().token;
    } else {
      return null;
    }
  }
}
