import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item: any = {};
  status;
  categoryId;
  itemId;

  constructor(
      private router: Router,
      private productService: ProductService
  ) {

    this.status = this.router.getCurrentNavigation().extras.state.status;
    this.item = {} || this.router.getCurrentNavigation().extras.state.data.item;
    this.categoryId = this.router.getCurrentNavigation().extras.state.data.categoryId;
    this.itemId = this.router.getCurrentNavigation().extras.state.data.itemId;
  }

  saveClick() {
    if (this.status === 'update') {
      this.productService.updateProduct(this.item);
    } else if (this.status === 'insert') {
      this.productService.insetProduct(this.categoryId, this.item);
    }
  }

  ngOnInit(): void {
  }

}
