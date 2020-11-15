import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/table.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {

    tableGroups: any = [];

    constructor(
        public tableService: TableService,
    ) {
    }

    ngOnInit(): void {
        this.tableService.getTables(res => this.tableGroups = res);
    }
}
