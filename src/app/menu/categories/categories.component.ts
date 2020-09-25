import {Component, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {MenuService} from '../../services/menu.service';
import {StorageService} from '../../base/services/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogCommentComponent} from '../../pages/admin/dialogs/dialog-comment/dialog-comment.component';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
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
