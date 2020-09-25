import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-menus',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    constructor(
        public location: Location,
    ) {
    }

    ngOnInit(): void {
    }

}
