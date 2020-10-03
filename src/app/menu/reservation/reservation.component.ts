import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ReservationService} from '../../services/reservation.service';
import {MenuService} from '../../services/menu.service';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

    reservation = {
        adultCount: 0,
        brand: {},
        childCount: 0,
        fullName: '',
        phoneNumber: '',
        reservationDate: '',
        specifications: ''
    };

    constructor(
        public location: Location,
        private reservationService: ReservationService,
        private menuService: MenuService
    ) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.reservation.brand = this.menuService.menu.brand
        this.reservationService.insertReservation(this.reservation, res => {
            if (res) this.location.back();
        });
    }
}
