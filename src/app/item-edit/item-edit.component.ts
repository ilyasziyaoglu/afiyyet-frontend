import { Component, OnInit } from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item: any;

  constructor(public storageService: StorageService) {
    this.item = storageService.getEditItemSession();
  }

  ngOnInit(): void {
  }

}
