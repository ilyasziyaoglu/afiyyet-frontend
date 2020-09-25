import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpService } from './http.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {

  basePath = '/user';

  constructor(
      httpService: HttpService,
      private storageService: StorageService
  ) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  logOut() {
    this.storageService.setItem('token', null);
    this.storageService.setItem('user', null);
  }
}
