import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/table.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {OrderItem, Product} from '../../../services/models/models';
import {OrderService} from '../../../services/order.service';
import Swal from 'sweetalert2';
import {OrderItemService} from '../../../services/order-item.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-table-detail',
    templateUrl: './table-detail.component.html',
    styleUrls: ['./table-detail.component.scss'],
})
export class TableDetailComponent implements OnInit {
    filteredProducts: Observable<Product[]>;

    displayedColumns: string[] = ['position', 'name', 'amount', 'portion', 'price', 'totalPrice', 'state', 'comment', 'actions'];

    constructor(
        private router: Router,
        public tableService: TableService,
        private orderService: OrderService,
        private orderItemService: OrderItemService,
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
                    this.tableService.currentTable.order = res;
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

    async onRemoveOrder(orderItem: OrderItem) {

        const {value: cancelForm} = await Swal.fire({
            title: 'İptal',
            showCancelButton: true,
            confirmButtonText: 'Sil',
            cancelButtonText: 'İptal',
            showLoaderOnConfirm: true,
            html:
                '<input matInput id="cancel-amount" placeholder="İptal adedi" class="swal2-input">' +
                '<input matInput id="cancel-reason" placeholder="İptal nedeni" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    id: orderItem.id,
                    cancelAmount: (document.getElementById('cancel-amount') as HTMLInputElement).value,
                    cancelReason: (document.getElementById('cancel-reason') as HTMLInputElement).value,
                };
            },
        });

        if ( cancelForm ) {
            this.orderItemService.cancelFromAdmin(cancelForm, res => {
                if ( res ) {
                    orderItem.state = 'CANCELLED';
                    Swal.fire('Sonuç', 'Sipariş başarı ile iptal edildi.', 'success');
                } else {
                    Swal.fire('Hata', 'Siparişi iptal ederken bir hata oluştu!', 'error');
                }
            });
        }
    }

    async closeTable() {
        const {value: closeTableForm} = await Swal.fire({
            title: 'Masayı Kapat',
            showCancelButton: true,
            confirmButtonText: 'Kapat',
            cancelButtonText: 'İptal',
            showLoaderOnConfirm: true,
            html:
                '<input matInput id="discount-amount" value="0" placeholder="İndirim miktarı" class="swal2-input">' +
                '<div class="custom-control custom-switch">\n' +
                '  <input type="checkbox" class="custom-control-input" id="is-percent">\n' +
                '  <label class="custom-control-label" for="is-percent">Yüzde</label>\n' +
                '</div>',
            focusConfirm: false,
            preConfirm: () => {
                console.log((document.getElementById('is-percent') as HTMLInputElement).value);
                return {
                    id: this.tableService.currentTable.id,
                    discountAmount: (document.getElementById('discount-amount') as HTMLInputElement).value,
                    isPercent: (document.getElementById('is-percent') as HTMLInputElement).value,
                };
            },
        });

        if ( closeTableForm ) {
            this.tableService.close(closeTableForm, res => {
                if ( res ) {
                    Swal.fire('Sonuç', 'Masa başarı ile kapatıldı.', 'success')
                        .then(() => this.router.navigateByUrl('/pages/admin/tables'));
                } else {
                    Swal.fire('Hata', 'Masayi kapatırken bir hata oluştu!', 'error');
                }
            });
        }
    }
}
