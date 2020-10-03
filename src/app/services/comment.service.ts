import { Injectable } from '@angular/core';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {BaseService} from '../base/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends BaseService{

  basePath = 'comment';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  getAllComments(cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-comments-by-brand`, '', cb);
  }

  insertComment(comment, cb?) {
    this.post(comment, cb);
  }
}
