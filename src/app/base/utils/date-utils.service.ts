import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  convertDateString(strDate) {
    return new Date(strDate).toLocaleString('en-GB').slice(0, -3);
  }
}
