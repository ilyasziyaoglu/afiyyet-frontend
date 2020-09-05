import { Component, OnInit } from '@angular/core';
import {MenuServiceService} from '../services/menu-service.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss']
})
export class SubmenuComponent implements OnInit {

  constructor(
      private menuService: MenuServiceService,
      private location: Location
  ) { }

  ngOnInit(): void {
  }

}
