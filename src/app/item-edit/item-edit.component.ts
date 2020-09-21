import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {CategoryService} from '../services/category.service';
import {FileService} from '../common/services/file.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item: any = {};
  status;

  constructor(
      private router: Router,
      private productService: ProductService,
      private categoryService: CategoryService,
      private fileService: FileService
  ) {

    this.status = this.router.getCurrentNavigation().extras.state.status;
    this.item = this.router.getCurrentNavigation().extras.state.data.item || {};
  }

  saveClick() {
    if (this.status === 'update') {
      this.productService.updateProduct(this.item, res => {
        if (res) {
          this.router.navigateByUrl('admin').then();
        }
      });
    } else if (this.status === 'insert') {
      this.productService.insetProduct(this.categoryService.currentCategory, this.item, res => {
        if (res) {
          this.router.navigateByUrl('admin').then();
        }
      });
    }
  }

  ngOnInit(): void {
  }

  imageUpdateClick(image) {
    const formData = new FormData();
    console.log("file", image.files[0]);
    formData.append("file0", image.files[0]);
    console.log("form", formData);
    this.fileService.uploadFile(formData, res => {
      console.log("res", res);
    })
  }

}
