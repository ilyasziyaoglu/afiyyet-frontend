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

    time: any;

    reservation = {
        adultCount: 2,
        brand: {},
        childCount: 0,
        fullName: '',
        phoneNumber: '',
        reservationDate: new Date(),
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
        this.reservation.brand = this.menuService.menu.brand;
        const hour = this.time.split(':');
        this.reservation.reservationDate.setHours(hour[0], hour[1]);
        console.log(this.reservation.reservationDate);
        this.reservationService.insertReservation(this.reservation, res => {
            if (res) { this.location.back(); }
        });
    }
}
