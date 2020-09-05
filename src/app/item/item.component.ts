import { Component, OnInit } from '@angular/core';
import {MenuServiceService} from '../services/menu-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  item: any;

  constructor(private menuService: MenuServiceService) {
    this.item = menuService.selectedItem;
  }

  ngOnInit(): void {
  }

}
