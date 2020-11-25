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
            let tableGroupList = [];
            for (const groupName of Object.keys(tableGroups)) {
                tableGroups[groupName].tables = tableGroups[groupName].tables.sort(this.compareString);
                tableGroupList.push(tableGroups[groupName]);
            }
            // tableGroupList = tableGroupList.sort(this.compareString);
            cb(tableGroupList);
        });
    }

    compareString(a, b){
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        if (x < y) {return -1; }
        if (x > y) {return 1; }
        return 0;
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
        this.adminSessionService.setCurrentTable(table.id);
    }

    updateCurrentTable() {
        this.get(this.adminSessionService.getCurrentTable(), res => this.currentTable = res);
    }

    getProducts(): Product[] {
        return this.productService.getProductList();
    }
}
