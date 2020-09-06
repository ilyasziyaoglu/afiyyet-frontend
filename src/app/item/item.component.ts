import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item: any;

  constructor(private storageService: StorageService) {
    this.item = storageService.getItem('item');
  }

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

}
