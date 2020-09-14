import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item: any = {};
  status;
  categoryId;
  itemId;

  constructor(
      private router: Router,
      private adminService: AdminService
  ) {

    this.status = this.router.getCurrentNavigation().extras.state.status;
    this.item = {} || this.router.getCurrentNavigation().extras.state.data.item;
    this.categoryId = this.router.getCurrentNavigation().extras.state.data.categoryId;
    this.itemId = this.router.getCurrentNavigation().extras.state.data.itemId;
  }

  saveClick() {
    if (this.status === 'update') {
      this.adminService.updateItem(this.itemId, this.item);
    } else if (this.status === 'insert') {
      this.adminService.insertItem(this.categoryId, this.item);
    }
  }

  ngOnInit(): void {
  }

}
