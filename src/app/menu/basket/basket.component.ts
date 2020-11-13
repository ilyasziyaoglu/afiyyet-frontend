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
    this.basketItems = this.basketItems.map(item => {
      return {
        ...item,
        unitPrice: item.price*item.portion,
        totalPrice: item.price*item.portion*item.amount
      }
    });
    this.totalPrice = this.basketItems.reduce((a, b) => {return a + b.totalPrice}, 0);
  }

  ngOnInit(): void {
  }

  arrowClick(i, isIncrease) {
    if (isIncrease) {this.basketItems[i].amount++;}
    else if (!isIncrease && this.basketItems[i].amount > 1) {
      this.basketItems[i].amount--;
    }
  }

  togglePopup() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
}
