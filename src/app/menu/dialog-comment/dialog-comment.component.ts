import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommentService} from '../../services/comment.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-dialog-comment',
  templateUrl: './dialog-comment.component.html',
  styleUrls: ['./dialog-comment.component.scss']
})
export class DialogCommentComponent implements OnInit {

  comment = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<DialogCommentComponent>,
              private commentService: CommentService,
              private menuService: MenuService) { }

  ngOnInit(): void {
  }

  saveClick() {
    let brand = {...this.menuService.menu.brand};
    delete brand.features;
    this.commentService.insertComment(
        {comment: this.comment, brand}, res => {
          if (res) { this.dialog.close(); }
    });
  }

  cancelClick() {
    this.dialog.close();
  }
}
