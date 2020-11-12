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

  constructor(public basketService: BasketService,
              private dialog: MatDialogRef<DialogBasketComponent>) { }

  ngOnInit(): void {
  }

  arrowClick(isIncrease: boolean) {
    if (isIncrease) this.amount++;
    else if (!isIncrease && this.amount > 1) this.amount--;
  }

  addClick() {
    this.basketService.addItemBasket({
      ...this.basketService.currentBasketItem,
      portion: this.portion,
      amount: this.amount
    });
    this.dialog.close();

  }
}
