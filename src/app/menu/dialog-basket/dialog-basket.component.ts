import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-basket',
  templateUrl: './dialog-basket.component.html',
  styleUrls: ['./dialog-basket.component.scss']
})
export class DialogBasketComponent implements OnInit {

  amount = 1;
  portion = 1;
  comment = '';

  constructor(public basketService: BasketService,
              private dialog: MatDialogRef<DialogBasketComponent>) { }

  ngOnInit(): void {
  }

  arrowClick(isIncrease: boolean) {
    if (isIncrease) this.amount++;
    else if (!isIncrease && this.amount > 1) this.amount--;
  }

  addClick() {
    let product = this.basketService.currentBasketItem.product;
    this.basketService.addItemBasket({
      product,
      portion: this.portion,
      amount: this.amount,
      comment: this.comment,
      unitPrice: product.price*this.portion,
      totalPrice: product.price*this.portion*this.amount
    });
    this.dialog.close();

  }
}
