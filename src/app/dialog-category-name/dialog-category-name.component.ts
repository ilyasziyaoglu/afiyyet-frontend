import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-category-name',
  templateUrl: './dialog-category-name.component.html',
  styleUrls: ['./dialog-category-name.component.scss']
})
export class DialogCategoryNameComponent implements OnInit {

  categoryName;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<DialogCategoryNameComponent>) {
    this.categoryName = data.categoryName;
  }

  ngOnInit(): void {
  }

  saveClick() {
    this.dialog.close({text: this.categoryName});
  }

  cancelClick() {
    this.dialog.close({});
  }

}
