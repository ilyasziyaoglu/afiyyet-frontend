import {Component, OnInit} from '@angular/core';
import {AsyncPipe, Location, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {TableService} from "../../../../services/table.service";
import {OrderService} from "../../../../services/order.service";
import {OrderItemService} from "../../../../services/order-item.service";
import {map, startWith} from "rxjs/operators";
import {Product} from "../../../../services/models/models";
import {Observable} from "rxjs";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        AsyncPipe,
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
        NgIf,
        NgClass,
        MatDatepicker,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatSuffix,
        NgxMaterialTimepickerModule
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
    filterOrderForm: FormGroup;
    filteredProducts: Observable<Product[]>;
    tables: any[] = [];
    orders: any[] = [];
    displayedColumns: string[] = [
        'id',
        'date',
        'totalPrice',
        'table',
        'actions'
    ];

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public location: Location,
        public tableService: TableService,
        private orderService: OrderService,
        private orderItemService: OrderItemService,
    ) {
    }

    ngOnInit() {
        let oneMonthBefore = new Date();
        oneMonthBefore.setMonth(new Date().getMonth() - 1);
        this.filterOrderForm = this.fb.group({
            id: null,
            productSearch: null,
            product: null,
            state: null,
            table: null,
            minPrice: null,
            maxPrice: null,
            startDate: oneMonthBefore,
            startTime: "04:00",
            endDate: new Date() ,
            endTime: "04:00",
        });

        this.filteredProducts = this.filterOrderForm.controls.productSearch.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );

        this.tableService.getTablesByBrand((res) => {
            this.tables = res;
        });
    }

    private _filter(value: string): Product[] {
        if ( value && this.tableService.getProducts() ) {
            return this.tableService.getProducts().filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
        }
    }

    onProductSelect(product: Product) {
        this.filterOrderForm.controls.product.setValue(product);
    }

    onFilterOrder() {
        this.orderService.filter(this.filterOrderForm.value, res => {
            if (res) {
                this.filterOrderForm.reset();
                this.orders = res;
            } else {
                Swal.fire('Hata', 'Sipariş güncellenirken bir hata oluştu!', 'error');
            }
        });
    }
}
