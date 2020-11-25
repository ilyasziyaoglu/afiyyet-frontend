import {Component, OnInit} from '@angular/core';
import {BasketService} from '../../services/basket.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogBasketCommentComponent} from '../dialog-basket-comment/dialog-basket-comment.component';
import {OrderService} from '../../services/order.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MenuService} from '../../services/menu.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {

    basketItems;
    totalPrice;
    isWaitTable;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private menuService: MenuService,
        private orderService: OrderService,
        public basketService: BasketService,
    ) {
        this.basketItems = basketService.getItemsBasket();
        this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
    }

    ngOnInit(): void {
    }

    arrowClick(i, isIncrease) {
        if ( isIncrease ) {
            this.basketItems[i].amount ++;
            this.basketItems[i].totalPrice += this.basketItems[i].unitPrice;
        } else if ( !isIncrease && this.basketItems[i].amount > 1 ) {
            this.basketItems[i].amount --;
            this.basketItems[i].totalPrice -= this.basketItems[i].unitPrice;
        }

        this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
        this.basketService.setItemsBasket(this.basketItems);
    }

    togglePopup() {
        const popup = document.getElementById('myPopup');
        popup.classList.toggle('show');
    }

    changePortion(i, portion) {
        this.basketItems[i].portion = portion;
        this.basketItems[i].unitPrice = this.basketItems[i].product.price * portion;
        this.basketItems[i].totalPrice = this.basketItems[i].unitPrice * this.basketItems[i].amount;

        this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
        this.basketService.setItemsBasket(this.basketItems);
    }

    removeItem(i) {
        this.basketItems.splice(i, 1);
        this.totalPrice = this.basketItems.reduce((a, b) => a + b.totalPrice, 0);
        this.basketService.setItemsBasket(this.basketItems);
    }

    updateComment(i) {
        this.basketService.currentBasketItem = this.basketItems[i];
        const dialogRef = this.dialog.open(DialogBasketCommentComponent, {width: '85%'});

        dialogRef.afterClosed().subscribe(isSaved => {
            if ( isSaved ) {
                this.basketItems[i].comment = this.basketService.currentBasketItem.comment;
                this.basketService.setItemsBasket(this.basketItems);
            }
        });
    }

    finishOrder() {
        this.orderService.createOrder({orderItems: this.basketItems, tableId: 3}, res => {
            if ( res ) {
                this.basketService.setItemsBasket([]);
                Swal.fire('Sonuç', 'Siparişiniz başarı ile oluşturuldu.', 'success').then(() => {
                  this.router.navigateByUrl('/menu/' + this.menuService.menu.brand.uniqueName);
                });
            } else {
                Swal.fire('Hata', 'Sipariş oluşturulurken bir hata oluştu!', 'error');
            }
        });
    }
}
