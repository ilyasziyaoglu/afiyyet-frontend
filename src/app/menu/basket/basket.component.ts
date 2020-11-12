import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basketItems;

  constructor(private basketService: BasketService) {
    this.basketItems = basketService.getItemsBasket();
  }

  ngOnInit(): void {
  }

  arrowClick(i, isIncrease) {
    if (isIncrease) {this.basketItems[i].amount++;}
    else if (!isIncrease && this.basketItems[i].amount > 1) {
      this.basketItems[i].amount--;
    }
  }
}
