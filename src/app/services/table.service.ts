import {Injectable} from '@angular/core';
import {BaseService} from '../base/services/base-service';
import {HttpMethod, HttpService} from '../base/services/http.service';
import {AdminSessionService} from '../base/services/admin-session.service';
import {ProductService} from './product.service';
import {Product} from './models/models';

@Injectable({
    providedIn: 'root',
})
export class TableService extends BaseService {

    basePath = 'table';

    currentTable: any;

    constructor(
        httpService: HttpService,
        private adminSessionService: AdminSessionService,
        private productService: ProductService,
    ) {
        super(httpService);
    }

    getBasePath(): string {
        return this.basePath;
    }

    getTables(cb?) {
        this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-tables-by-brand`, '', res => {
            const tableGroups = {};
            res.forEach(table => {
                tableGroups[table.groupName] = tableGroups[table.groupName] || {name: table.groupName, tables: []};
                tableGroups[table.groupName].tables.push(table);
            });
            const tableGroupList = [];
            for (const groupName of Object.keys(tableGroups)) {
                tableGroupList.push(tableGroups[groupName]);
            }
            cb(tableGroupList);
        });
    }

    getGroupNames(cb?) {
        this.getHttpService().doRequest(HttpMethod.GET, `${this.getBasePath()}/get-group-names-by-brand`, '', cb);
    }

    close(tableCloseRequest: any, cb?) {
        this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/close`, tableCloseRequest, cb);
    }

    transfer(tableTransferRequest: any, cb?) {
        this.getHttpService().doRequest(HttpMethod.POST, `${this.getBasePath()}/transfer`, tableTransferRequest, cb);
    }

    setCurrentTable(table: any) {
        this.currentTable = table;
        this.adminSessionService.setCurrentTable(table);
    }

    getCurrentTable() {
        if ( this.currentTable ) {
            return this.currentTable;
        }
        return this.adminSessionService.getCurrentTable();
    }

    getProducts(): Product[] {
        return this.productService.getProductList();
    }
}
