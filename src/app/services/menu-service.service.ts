import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  selectedCategory: any;
  selectedItem: any;

  constructor() { }
}
