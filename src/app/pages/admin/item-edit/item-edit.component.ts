import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {CategoryService} from '../../../services/category.service';
import {FileService} from '../../../base/services/file.service';
import Swal from 'sweetalert2';
import {AdminSessionService} from '../../../base/services/admin-session.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item: any = {};
  sessionData: any;
  formData: FormData;

  constructor(
      private router: Router,
      private productService: ProductService,
      private categoryService: CategoryService,
      private fileService: FileService,
      public location: Location,
      private adminSessionService: AdminSessionService
  ) {
    this.sessionData = this.adminSessionService.getCurrentProduct() || {};
    this.item = this.sessionData.product || {};
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

    if ( isNaN(this.item.price) ) {
      Swal.fire('Uyarı', 'Ürün fiyatı rakam olmak zorundadır!', 'warning');
      return;
    }

    if ((!this.formData || !this.formData.has('file0')) && !this.item.imgUrl) {
      Swal.fire('Uyarı', 'Ürün fotoğrafı boş bırakılamaz!', 'warning');
      return;
    }

    if (this.sessionData.isEdit) {
      if (this.formData) {
        this.fileService.uploadFile(this.formData, res => {
          if (res.fileName) {
            this.item.imgUrl = res.fileName;
            this.productService.update(this.item, res => {
              if (res) this.router.navigateByUrl('/pages/admin').then();
            });
          } else {
            Swal.fire('Uyarı', 'Resim yüklenirken hata oluştu', 'warning');
          }
        });
      } else {
        this.productService.update(this.item, res => {
          if (res) this.router.navigateByUrl('/pages/admin').then();
        });
      }
    } else {
      this.fileService.uploadFile(this.formData, res => {
        if (res.fileName) {
          this.item.imgUrl = res.fileName;
          this.productService.insert({id: this.adminSessionService.getCurrentCategoryId()}, this.item, response => {
            if (response) { this.router.navigateByUrl('/pages/admin'); }
          });
        } else {
          Swal.fire('Uyarı', 'Resim yüklenirken hata oluştu', 'warning');
        }
      });
    }
  }

  ngOnInit(): void {
  }

  imageUpdateClick(event) {
    if ( event.target.files && event.target.files[0] ) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.item.imgUrl = reader.result.toString();
      reader.readAsDataURL(file);

      this.formData = new FormData();
      this.formData.append('file0', file);
    }
  }

}
