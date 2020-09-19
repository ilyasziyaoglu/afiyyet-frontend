import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../services/favorite.service';
import {MenuService} from '../services/menu.service';
import {StorageService} from '../common/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
      public storageService: StorageService,
      public menuService: MenuService,
      public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }
}
