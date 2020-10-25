import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../services/models/models';
import {FileService} from '../../../base/services/file.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dialog-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {

    category: Category;
    isInsert = true;
    formData: FormData;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<CategoryEditComponent>,
        private fileService: FileService
    ) {
        this.category = data || new Category();
        if ( data ) {
            this.isInsert = false;
        }
    }

    ngOnInit(): void {
    }

    saveClick() {
        if ( !this.category.name ) {
            Swal.fire('Uyarı', 'Kategori ismi boş bırakılamaz!', 'warning');
            return;
        }

        if ( (!this.formData || !this.formData.has('file0')) && !this.category.imgUrl ) {
            Swal.fire('Uyarı', 'Kategori fotoğrafı boş bırakılamaz!', 'warning');
            return;
        }

        if ( this.formData ) {
            this.fileService.uploadFile(this.formData, res => {
                if ( res.fileName ) {
                    this.category.imgUrl = res.fileName;
                    this.dialog.close({category: this.category});
                } else {
                    Swal.fire('Uyarı', 'Resim yüklenirken hata oluştu', 'warning');
                }
            });
        } else {
            this.dialog.close({category: this.category});
        }
    }

    cancelClick() {
        this.dialog.close({});
    }

    imageUpdateClick(event) {
        if ( event.target.files && event.target.files[0] ) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.category.imgUrl = reader.result.toString();
            reader.readAsDataURL(file);

            this.formData = new FormData();
            this.formData.append('file0', file);
        }
    }
}
