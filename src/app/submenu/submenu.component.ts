import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';
import {FavoriteService} from '../services/favorite.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  constructor(
      public storageService: StorageService,
      public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
  }
}
