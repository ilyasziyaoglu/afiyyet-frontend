import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basketItems;
  totalPrice;
  isWaitTable;

  constructor(private basketService: BasketService) {
    this.basketItems = basketService.getItemsBasket();
    this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
  }

  ngOnInit(): void {
  }

  arrowClick(i, isIncrease) {
    if (isIncrease) {
      this.basketItems[i].amount++;
      this.basketItems[i].totalPrice += this.basketItems[i].unitPrice;
    }
    else if (!isIncrease && this.basketItems[i].amount > 1) {
      this.basketItems[i].amount--;
      this.basketItems[i].totalPrice -= this.basketItems[i].unitPrice;
    }

    this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
    this.basketService.setItemsBasket(this.basketItems);
  }

  togglePopup() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  changePortion(i, portion) {
    this.basketItems[i].portion = portion;
    this.basketItems[i].unitPrice = this.basketItems[i].price * portion;
    this.basketItems[i].totalPrice = this.basketItems[i].unitPrice * this.basketItems[i].amount;

    this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
    this.basketService.setItemsBasket(this.basketItems);
  }

  removeItem(i) {
    this.basketItems.splice(i, 1);
    this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
    this.basketService.setItemsBasket(this.basketItems);
  }
}
