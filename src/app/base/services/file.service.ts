import {Injectable} from '@angular/core';
import {HttpMethod, HttpService} from './http.service';
import {BaseService} from './base-service';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService{

  basePath = 'file';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  uploadFile(file: any, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/upload`, file, cb, true);
  }


}
