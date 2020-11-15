import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TableService} from '../../../services/table.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-table',
    templateUrl: './edit-table.component.html',
    styleUrls: ['./edit-table.component.scss'],
})
export class EditTableComponent implements OnInit {
    groupNames: any = [];
    addGroupName = false;
    groupName: string;

    tableForm = new FormGroup({
        name: new FormControl('', Validators.required),
        groupName: new FormControl('', Validators.required)
    });

    constructor(
        public location: Location,
        private tableService: TableService,
    ) {
        tableService.getGroupNames(res => this.groupNames = res);
    }

    ngOnInit(): void {
    }

    saveClick() {
        if ( !this.tableForm.valid ) {
            this.tableForm.markAllAsTouched();
            return;
        }

        this.tableService.post(this.tableForm.value, res => {
            if ( res ) {
                Swal.fire('Başarılı', 'Masa başarı ile oluşturuldu.', 'success');
            } else {
                Swal.fire('Hata', 'Masa oluşturulurken bilinmeyen bir hata oluştu!', 'error');
            }
        });
    }

    onAddGroupName() {
        this.tableForm.controls.groupName.markAsTouched();

        if ( this.groupName && !this.isDuplicate(this.groupNames, this.groupName) ) {
            this.groupNames.push(this.groupName);
            this.tableForm.controls.groupName.setValue(this.groupName);
            this.addGroupName = false;
        }
    }

    isDuplicate(arr: string [], val: string): boolean {
        return arr.includes(val);
    }
}
