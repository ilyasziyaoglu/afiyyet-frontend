import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../services/favorite.service';
import {MenuService} from '../services/menu.service';
import {StorageService} from '../common/services/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogCommentComponent} from '../dialogs/dialog-comment/dialog-comment.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  environment = environment;

  constructor(
      public storageService: StorageService,
      public menuService: MenuService,
      public favoriteService: FavoriteService,
      private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onLike(item: any) {
    this.menuService.like(item);
  }

  commentClick() {
    this.dialog.open(DialogCommentComponent,  {width: '85%'});
  }
}
