import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Category, Item} from '../model/models';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogCategoryNameComponent} from '../dialog-category-name/dialog-category-name.component';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  openIndex = 0;
  selectedCategoryIndex = 0;
  itemSave = false;
  categorySave = false;

  categories: any[];
  constructor(
      private menuService: MenuService, private storageService: StorageService,
      private router: Router,
      private dialog: MatDialog,
      private adminService: AdminService
  ) {
    this.categories = menuService.getCategories();
  }

  ngOnInit(): void {
  }

  menuClick(index) {
    this.openIndex = index;
  }

  categoryArrangeSave() {
    let pairs = [];
    this.categories.forEach(category => {
      pairs.push({id: category.id, order: category.order});
    });
    this.adminService.arrangeCateogoryOrders(pairs);
  }

  dropCategory(event: CdkDragDrop<Category>) {
    this.categorySave = true;
    this.categories = this.moveItemOrderInArray(this.categories, event.previousIndex, event.currentIndex);
  }

  moveItemOrderInArray(arr, prevIndex, nextIndex) {
    arr.splice(nextIndex, 0, arr.splice(prevIndex, 1)[0]);
    arr = arr.map((item, i) => ({...item, order: i}));
    return arr;
  }

  categoryClick(i: number) {
    this.selectedCategoryIndex = i;
  }

  addItem(categoryId: number) {
    this.router.navigateByUrl('item-edit',
        {state: {status: 'insert', data: {categoryId, itemId: null, item: null}}}).then();
  }

  editCategoryName(category) {
    let dialogRef = this.dialog.open(DialogCategoryNameComponent,
        {data: {categoryName: category.name}});

    dialogRef.afterClosed().subscribe(res => {
      if (res.text) {
        this.adminService.updateCategoryName(category.id, res.text);
      }
    });
  }

  deleteItem(itemId) {
    if (confirm("Bu Ürünü Silmek İstediğinize Emin misiniz?")) {
      this.adminService.deleteItem(itemId);
    }
  }

  editItem(item) {
    this.router.navigateByUrl('item-edit',
        {state: {status: 'update', data: {categoryId: null, itemId: item.id, item}}}).then();
  }


}
