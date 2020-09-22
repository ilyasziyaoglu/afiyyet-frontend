import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../model/models';
import {environment} from '../../../environments/environment';
import {FileService} from '../../common/services/file.service';

@Component({
  selector: 'app-dialog-category-edit',
  templateUrl: './dialog-category-edit.component.html',
  styleUrls: ['./dialog-category-edit.component.scss']
})
export class DialogCategoryEditComponent implements OnInit {

  category: Category;
  isInsert = true;
  environment = environment;
  formData: FormData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<DialogCategoryEditComponent>,
              private fileService: FileService) {
    this.category = data || new Category();
    if (data) this.isInsert = false;
  }

  ngOnInit(): void {
  }

  saveClick() {
    this.fileService.uploadFile(this.formData, res => {
      if (res.fileName) {
        this.category.imgUrl = res.fileName;
        this.dialog.close({category: this.category});
      } else {
        // Burada Kullanıcıya resmin yüklenmemesi ile alakalı bildirim gösterilecek
      }
    });
  }

  cancelClick() {
    this.dialog.close({});
  }

  imageUpdateClick(image) {
    this.formData = new FormData();
    this.formData.append('file0', image.files[0]);
  }
}
