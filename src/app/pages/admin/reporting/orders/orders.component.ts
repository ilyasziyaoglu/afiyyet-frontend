import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, Location, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import Swal from "sweetalert2";
import {TableService} from "../../../../services/table.service";
import {OrderService} from "../../../../services/order.service";
import {map, startWith} from "rxjs/operators";
import {Product} from "../../../../services/models/models";
import {Observable} from "rxjs";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource,
    MatTableModule
} from "@angular/material/table";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";

export interface Order {
    position: number;
    date: Date;
    totalPrice: number;
    table: number;
}

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
        NgxMaterialTimepickerModule,
        MatHeaderCellDef,
        // MatPaginator,
        MatTableModule,
        MatPaginatorModule,
        // MatSort,
        MatSortModule,
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    private _liveAnnouncer = inject(LiveAnnouncer);
    filterOrderForm: FormGroup;
    filteredProducts: Observable<Product[]>;
    tables: any[] = [];
    orders = new MatTableDataSource<Order>();
    displayedColumns: string[] = [
        'position',
        'createdDate',
        'totalPrice',
        'tableId',
        // 'actions'
    ];
    private page: PageEvent = {length: 0, previousPageIndex: 0, pageIndex: 0, pageSize: 20};
    private sortForApi = "createdDate,desc";
    clickedRows = new Set<Order>();

    constructor(
        private fb: FormBuilder,
        public location: Location,
        public tableService: TableService,
        private orderService: OrderService,
    ) {
    }

    ngOnInit() {
        let oneMonthBefore = new Date();
        oneMonthBefore.setMonth(new Date().getMonth() - 1);
        let tomorrow = new Date(new Date().getTime() + 86400000);
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
            endDate: tomorrow ,
            endTime: "04:00",
        });

        this.filteredProducts = this.filterOrderForm.controls.productSearch.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
        );

        this.tableService.getTablesByBrand((res) => {
            this.tables = res;
        });

        this.orders.paginator = this.paginator;
        this.orders.sort = this.sort;

        this.onFilterOrder();
    }

    ngAfterViewInit() {
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
        this.sortForApi = sortState.direction ? sortState.active + "," + sortState.direction : "createdDate,desc";
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
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
        let filterReq = {...this.filterOrderForm.value};
        let startHour = filterReq.startTime.split(":")[0];
        let startMinutes = filterReq.startTime.split(":")[1];
        let endHour = filterReq.endTime.split(":")[0];
        let endMinutes = filterReq.endTime.split(":")[1];
        filterReq.startDate.setHours(startHour, startMinutes);
        filterReq.endDate.setHours(endHour, endMinutes);
        filterReq.page = this.page;
        filterReq.sort = this.sortForApi;
        this.orderService.filter(filterReq, res => {
            if (res) {
                this.orders.data = res.content;
                this.paginator.length = res.totalElements;
            } else {
                Swal.fire('Hata', 'Siparişler listelenirken bir hata oluştu!', 'error');
            }
        });
    }

    getTableNameById(id: any) {
        return this.tables.filter(table => table.id === id)[0]?.name || id;
    }

    onPageChange(event: PageEvent) {
        this.page = event;
        this.onFilterOrder();
    }
}
