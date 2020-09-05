import {Component, OnInit} from '@angular/core';
import {StorageService} from '../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = {
    currency: 'TL',
    content: []
  };

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    for (let i = 0; i < 20; i ++) {
      const category = {
        name: 'SOGUK ICECEKLER',
        mainmedia: 'https://www.sopeli.com.tr/wp-content/uploads/2018/05/499KAHVALTI-SOPELI%CC%87-2018-web.jpg',
        items: []
      };
      for (let j = 0; j < 10; j ++) {
        const item = {
          id: i.toString() + j.toString(),
          rate: Math.round(Math.random() * 5),
          name: 'Saklibahce Serpme Kahvalti',
          image: 'https://www.645kk.com/wp-content/uploads/2017/07/CAFE-LATTE.jpg',
          price: 20.00,
          content: 'Beyaz peynir, Kasar peyniri, Van otlu peynir, Burgu peyniri'
        };
        category.items.push(item);
      }

      this.menu.content.push(category);
    }
  }
}
