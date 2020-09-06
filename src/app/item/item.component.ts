import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {FavoriteService} from '../services/favorite.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item: any;

  constructor(
      public storageService: StorageService,
      public favoriteService: FavoriteService
  ) {
    this.item = storageService.getItem('item');
  }

  ngOnInit(): void {
  }

}
