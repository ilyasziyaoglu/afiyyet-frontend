import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/table.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Product} from '../../../services/models/models';

@Component({
    selector: 'app-table-detail',
    templateUrl: './table-detail.component.html',
    styleUrls: ['./table-detail.component.scss'],
})
export class TableDetailComponent implements OnInit {
    filteredProducts: Observable<Product[]>;

    orderItems = [
        {
            id: 1,
            product: {
                category: {createdDate: null, createdBy: null, lastModifiedBy: null, id: 173, name: 'SAHANDA LEZZETLER & MENEMENLER'},
                categoryName: null,
                description: 'Köy Tereyağında Pişirilmiş İki Adet Köy Yumurtası Ve Beyaz Peynir',
                expireDate: null,
                fakePrice: null,
                hasPortionOption: null,
                id: 14,
                imgUrl: 'https://egekahvecisi.qrmenue.com/firma_images/products/kucuk/egekahvecisi.qrmenue.com_C2890.jpg',
                likes: 123,
                name: 'SAHANDA PEYNİRLİ YUMURTA ',
                order: null,
                price: 16,
                startDate: null,
                status: null,
                type: null,
            },
            amount: 3,
            totalPrice: 130,
            portion: 1.5,
            comment: 'Çabuk olun lan!',
        },
        {
            id: 2,
            product: {
                category: {createdDate: null, createdBy: null, lastModifiedBy: null, id: 173, name: 'SAHANDA LEZZETLER & MENEMENLER'},
                categoryName: null,
                description: 'Köy Tereyağında Pişirilmiş İki Adet Köy Yumurtası Ve Beyaz Peynir',
                expireDate: null,
                fakePrice: null,
                hasPortionOption: null,
                id: 14,
                imgUrl: 'https://egekahvecisi.qrmenue.com/firma_images/products/kucuk/egekahvecisi.qrmenue.com_C2890.jpg',
                likes: 123,
                name: 'SAHANDA PEYNİRLİ YUMURTA ',
                order: null,
                price: 15,
                startDate: null,
                status: null,
                type: null,
            },
            amount: 3,
            totalPrice: 130,
            portion: 1.5,
            comment: 'Çabuk olun lan!',
        },
    ];

    displayedColumns: string[] = ['position', 'name', 'amount', 'portion', 'price', 'totalPrice', 'comment'];

    constructor(
        public tableService: TableService,
    ) {
        // this.orderItems.push(tableService.getCurrentTable().order.orderItems);
    }

    addOrderForm = new FormGroup({
        product: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
        portion: new FormControl(null, Validators.required),
        comment: new FormControl('', Validators.required),
    });

    ngOnInit() {
        this.filteredProducts = this.addOrderForm.controls.product.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );
    }

    private _filter(value: string): Product[] {
        console.log(value);
        if ( value && this.tableService.getProducts() ) {
            return this.tableService.getProducts().filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
        }
    }

    onAddOrder() {
        if ( this.addOrderForm.valid ) {
        }
    }
}
