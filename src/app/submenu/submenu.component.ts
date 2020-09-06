import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  constructor(
      public storageService: StorageService,
  ) { }

  ngOnInit(): void {
  }

  removeFavorite(item: any) {
    const index = this.storageService.favorites.indexOf(item.id);
    this.storageService.favorites.splice(index, 1);
    this.storageService.updateItem('favorites');
  }

  addFavorite(item: any) {
    this.storageService.favorites.push(item.id);
    this.storageService.updateItem('favorites');
  }

  isFavorite(id) {
    return this.storageService.favorites.includes((id));
  }
}
