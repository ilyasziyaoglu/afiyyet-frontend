import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/table.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {

    tableGroups: any = [];

    constructor(
        public tableService: TableService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.tableService.getTables(res => this.tableGroups = res);
    }

    onSelectTable(table: any) {
        this.tableService.setCurrentTable(table);
        this.router.navigateByUrl('/pages/admin/table-detail');
    }
}
