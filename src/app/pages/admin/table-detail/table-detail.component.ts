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

    displayedColumns: string[] = ['position', 'name', 'amount', 'portion', 'price', 'totalPrice', 'comment'];

    constructor(
        public tableService: TableService,
    ) {
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
            if ( this.tableService.getCurrentTable().order && this.tableService.getCurrentTable().order.orderItems ) {
                this.tableService.getCurrentTable().order.orderitems.push(this.addOrderForm.value);
            } else if ( this.tableService.getCurrentTable().order ) {
                this.tableService.getCurrentTable().order.orderitems = [this.addOrderForm.value];
            } else {
                this.tableService.getCurrentTable().order = {
                    tableId: this.tableService.getCurrentTable().id,
                    orderItems: [this.addOrderForm.value],
                };
            }
        }
    }
}
