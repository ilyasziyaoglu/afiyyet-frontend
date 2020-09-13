import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Category, Item} from '../model/models';
import {StorageService} from '../services/storage.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogCategoryNameComponent} from '../dialog-category-name/dialog-category-name.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  openIndex = 0;
  selectedCategoryIndex = 0;
  hasToSave = false;

  categories: any[];
  constructor(
      private menuService: MenuService, private storageService: StorageService,
      private router: Router,
      private dialog: MatDialog
  ) {
    this.categories = menuService.getCategories();
  }

  ngOnInit(): void {
  }

  menuClick(index) {
    this.openIndex = index;
  }

  drop(event: CdkDragDrop<Category>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }

  categoryClick(i: number) {
    this.selectedCategoryIndex = i;
  }

  addItem(index: number) {
    this.hasToSave = true;
    this.categories[index].items = [new Item()].concat(this.categories[index].items);
  }

  editCategoryName(index: number) {
    this.dialog.open(DialogCategoryNameComponent, {data: {categoryName: this.categories[index].name, index}});
  }

  deleteItem(categoryIdx: number, itemIdx: number) {
    this.hasToSave = true;
    this.categories[categoryIdx].items.splice(itemIdx, 1);
  }

  editItem(categoryIdx: number, itemIdx: number) {
    this.storageService.setEditItemSession(this.categories[categoryIdx].items[itemIdx]);
    this.router.navigateByUrl('item-edit').then();
  }


}
