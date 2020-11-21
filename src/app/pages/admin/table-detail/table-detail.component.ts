import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/table.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Product} from '../../../services/models/models';
import {OrderService} from '../../../services/order.service';
import Swal from "sweetalert2";

@Component({
    selector: 'app-table-detail',
    templateUrl: './table-detail.component.html',
    styleUrls: ['./table-detail.component.scss'],
})
export class TableDetailComponent implements OnInit {
    filteredProducts: Observable<Product[]>;

    displayedColumns: string[] = ['position', 'name', 'amount', 'portion', 'price', 'totalPrice', 'comment'];

    constructor(
        public tableService: TableService,
        private orderService: OrderService,
    ) {
        tableService.updateCurrentTable();
    }
    addOrderForm = new FormGroup({
        productSearch: new FormControl(null, Validators.required),
        product: new FormControl(null, Validators.required),
        amount: new FormControl(1, Validators.required),
        portion: new FormControl('1', Validators.required),
        comment: new FormControl(''),
    });

    ngOnInit() {
        this.filteredProducts = this.addOrderForm.controls.productSearch.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );
    }

    private _filter(value: string): Product[] {
        if ( value && this.tableService.getProducts() ) {
            return this.tableService.getProducts().filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
        }
    }

    onAddOrder() {
        if ( this.addOrderForm.valid ) {
            const order = {
                tableId: this.tableService.currentTable.id,
                orderItems: [this.addOrderForm.value],
            };
            this.orderService.createOrder(order, res => {
                if ( res ) {
                    this.tableService.currentTable.order.orderItems = res.orderItems;
                    Swal.fire('Sonuç', 'Sipariş başarı ile eklendi.', 'success');
                } else {
                    Swal.fire('Hata', 'Sipariş eklerken bir hata oluştu!', 'error');
                }
            });
        }
    }

    onProductSelect(product: Product) {
        this.addOrderForm.controls.product.setValue(product);
    }
}
