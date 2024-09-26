import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../services/table.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {

    tableGroups: any = [];
    isSelection = false;
    sourceTable: any;

    constructor(
        public tableService: TableService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.tableService.getTableGroupsbByBrand(res => this.tableGroups = res);
    }

    onSelectTable(table: any) {
        this.tableService.setCurrentTable(table);
        this.router.navigateByUrl('/pages/admin/table-detail');
    }

    onActivateSelection(table) {
        this.sourceTable = table;
        this.isSelection = true;
    }

    onSelectTargetTable(targetTable: any) {
        if ( this.isSelection ) {
            this.isSelection = false;
            Swal.fire({
                title: 'Uyarı',
                icon: 'info',
                html: 'Bu işlem geri alınamaz! Devam etmek istediğinizden emin misiniz?',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Devam et',
                cancelButtonText: 'İptal',
            }).then(value => {
                if ( value ) {
                    this.tableService.transfer({sourceId: this.sourceTable.id, targetId: targetTable.id}, res => {
                        if ( res ) {
                            Swal.fire('Sonuç', 'Masa başarı ile aktarıldı.', 'success');
                            window.location.reload();
                        } else {
                            Swal.fire('Hata', 'Masa aktarılırken bir hata oluştu!', 'error');
                        }
                    });
                }
            });
        }
    }
}
