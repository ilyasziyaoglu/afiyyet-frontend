import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../services/models/models';
import {FileService} from '../../../base/services/file.service';
import Swal from 'sweetalert2';
import {CategoryService} from '../../../services/category.service';

@Component({
    selector: 'app-dialog-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
    category = inject<Category>(MAT_DIALOG_DATA);

    isInsert = true;
    formData: FormData;

    constructor(
        private dialog: MatDialogRef<CategoryEditComponent>,
        private categoryService: CategoryService,
        private fileService: FileService
    ) {}

    ngOnInit(): void {
        if ( this.category ) {
            this.isInsert = false;
        }
        this.category = this.category || new Category();
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
                    if (this.isInsert) {
                        this.category.status = 'ACTIVE';
                        this.categoryService.insertCategory(this.category, result => {
                            this.categoryService.categories.push(result);
                        });
                    } else {
                        this.categoryService.updateCategory(this.category, () => {});
                    }
                    this.dialog.close();
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
