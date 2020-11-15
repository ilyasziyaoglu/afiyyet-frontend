import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-dialog-basket-comment',
  templateUrl: './dialog-basket-comment.component.html',
  styleUrls: ['./dialog-basket-comment.component.scss']
})
export class DialogBasketCommentComponent implements OnInit {

  comment = '';

  constructor(private dialog: MatDialogRef<DialogBasketCommentComponent>,
              private basketService: BasketService) {
    this.comment = basketService.currentBasketItem.comment;
  }

  ngOnInit(): void {
  }

  saveClick() {
    this.basketService.currentBasketItem.comment = this.comment;
    this.dialog.close(true);
  }

  cancelClick() {
    this.dialog.close(false);
  }

}
