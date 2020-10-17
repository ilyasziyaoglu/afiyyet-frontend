import { Injectable } from '@angular/core';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {BaseService} from '../base/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService extends BaseService{

  basePath = 'contactform';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }
}
