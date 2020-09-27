import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import { DialogCommentComponent } from '../pages/admin/dialogs/dialog-comment/dialog-comment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-menus',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    constructor(
        public location: Location,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    commentClick() {
      this.dialog.open(DialogCommentComponent,  {width: '85%'});
    }

}
