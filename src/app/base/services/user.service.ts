import {Injectable} from '@angular/core';
import {AdminSessionService} from './admin-session.service';
import {AdminLocalService} from './admin-local.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  isOrderEnabled;
  isCampEnabled;
  isCRUDEnabled;
  isFeedBackEnabled;
  isReservEnabled;
  isReportsEnabled;

  constructor(
      private adminSessionService: AdminSessionService,
      private adminLocalService: AdminLocalService
  ) {
  }

  logOut() {
    this.adminLocalService.removeUser();
    this.adminSessionService.removeUser();
  }

  login(user, token, isRememberCheck) {
    if (isRememberCheck) {
      this.adminLocalService.setUser(user, token);
      this.adminSessionService.removeUser();
    } else {
      this.adminSessionService.setUser(user, token);
      this.adminLocalService.removeUser();
    }
  }

  register(user, token) {
    this.adminLocalService.setUser(user, token);
    this.adminSessionService.removeUser();
  }

  getUser() {
    if (this.adminLocalService.getUser()) {
      return this.adminLocalService.getUser();
    } else if (this.adminSessionService.getUser()) {
      return this.adminSessionService.getUser();
    } else {
      return false;
    }
  }

  getToken() {
    if (this.adminLocalService.getUser()) {
      return this.adminLocalService.getUser().token;
    } else if (this.adminSessionService.getUser()) {
      return this.adminSessionService.getUser().token;
    } else {
      return null;
    }
  }
}
