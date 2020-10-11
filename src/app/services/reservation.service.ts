import { Injectable } from '@angular/core';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {BaseService} from '../base/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends BaseService{

  basePath = 'reservation';

  constructor(httpService: HttpService) {
    super(httpService);
  }

  getBasePath(): string {
    return this.basePath;
  }

  getAllReservations(cb?) {
    this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-reservations-by-brand`, '', cb);
  }

  insertReservation(reservation, cb?) {
    this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/guest/reserve`, reservation, cb);
  }
}
