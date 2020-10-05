import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DialogCommentComponent} from './dialog-comment/dialog-comment.component';
import {MatDialog} from '@angular/material/dialog';
import {MenuService} from '../services/menu.service';
import {AdminSessionService} from '../base/services/admin-session.service';
import {FavoriteService} from '../services/favorite.service';

@Component({
    selector: 'app-menus',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    constructor(
        public location: Location,
        private dialog: MatDialog,
        public menuService: MenuService,
        public favoriteService: FavoriteService,
    ) {
        const brand = window.location.href.split('/')[5];
        if ( brand ) {
            this.menuService.getMenu(brand);
        }
    }

    ngOnInit(): void {
    }

    commentClick() {
        this.dialog.open(DialogCommentComponent, {width: '85%'});
    }

}
