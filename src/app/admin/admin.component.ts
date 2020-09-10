import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Category} from '../model/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  categories: any[];
  constructor(private menuService: MenuService) {
    this.categories = menuService.getCategories();
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Category>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }



}
