import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {FileService} from '../../../base/services/file.service';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  environment = environment;

  item: any = {};
  status;
  formData: FormData;

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
    if (!this.item.name) {
      Swal.fire('Uyarı', 'Ürün ismi boş bırakılamaz!', 'warning');
      return;
    }

    if (!this.item.price) {
      Swal.fire('Uyarı', 'Ürün fiyatı boş bırakılamaz!', 'warning');
      return;
    }

    if ((!this.formData || !this.formData.has('file0')) && !this.item.imgUrl) {
      Swal.fire('Uyarı', 'Ürün fotoğrafı boş bırakılamaz!', 'warning');
      return;
    }

    if (this.status === 'update') {
      if (this.formData) {
        this.fileService.uploadFile(this.formData, res => {
          if (res.fileName) {
            this.item.imgUrl = res.fileName;
            this.productService.updateProduct(this.item, res => {
              if (res) this.router.navigateByUrl('admin').then();
            });
          }
        });
      } else {
        this.productService.updateProduct(this.item, res => {
          if (res) this.router.navigateByUrl('admin').then();
        });
      }
    } else if (this.status === 'insert') {
      this.fileService.uploadFile(this.formData, res => {
        if (res.fileName) {
          this.item.imgUrl = res.fileName;
          this.productService.insetProduct(this.categoryService.currentCategory, this.item, response => {
            if (response) { this.router.navigateByUrl('admin'); }
          });
        }
      });
    }
  }

  ngOnInit(): void {
  }

  imageUpdateClick(image) {
    this.formData = new FormData();
    this.formData.append('file0', image.files[0]);
  }

}
