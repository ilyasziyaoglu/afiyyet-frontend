import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-dialog-basket',
  templateUrl: './dialog-basket.component.html',
  styleUrls: ['./dialog-basket.component.scss']
})
export class DialogBasketComponent implements OnInit {

  count = 1;
  portion = 1;

  constructor(public basketService: BasketService) { }

  ngOnInit(): void {
  }

  arrowClick(isIncrease: boolean) {
    if (isIncrease) this.count++;
    else if (!isIncrease && this.count > 1) this.count--;
  }
}
