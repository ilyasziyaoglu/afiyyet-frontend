import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ReservationService} from '../../services/reservation.service';
import {MenuService} from '../../services/menu.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {

    time: any;

    reservation = {
        adultCount: 2,
        brand: {},
        childCount: 0,
        fullName: '',
        phoneNumber: '',
        reservationDate: null,
        specifications: '',
    };

    constructor(
        public location: Location,
        private reservationService: ReservationService,
        private menuService: MenuService,
    ) {
    }

    ngOnInit(): void {
    }

    onSubmit() {

        if ( !this.reservation.fullName ) {
            Swal.fire('Uyarı', 'İsim soyisim boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.reservation.reservationDate ) {
            Swal.fire('Uyarı', 'Rezervasyon tarihi boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.time ) {
            Swal.fire('Uyarı', 'Rezervasyon saati boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.reservation.phoneNumber ) {
            Swal.fire('Uyarı', 'Telefon numarası boş bırakılamaz!', 'warning');
            return;
        }

        if ( !this.isPhoneNumeber(this.reservation.phoneNumber) ) {
            Swal.fire('Uyarı', 'Telefon numarası hatalıdır!', 'warning');
            return;
        }

        if ( !this.reservation.adultCount ) {
            Swal.fire('Uyarı', 'Yetişkin sayısı boş bırakılamaz!', 'warning');
            return;
        }

        this.reservation.brand = this.menuService.menu.brand;
        const hour = this.time.split(':');
        this.reservation.reservationDate.setHours(hour[0], hour[1]);
        console.log(this.reservation.reservationDate);
        this.reservationService.insertReservation(this.reservation, res => {
            if ( res ) {
                Swal.fire('Sonuç', 'Rezervasyonunuz başarı ile oluşturulmuştur!', 'success').then(() => {
                    this.location.back();
                });
            } else {
                Swal.fire('Sonuç', 'Rezervasyonunuz olu;tururken bir hata ile karşılaştık! :( Lütfen bilgileri kontrol edin veya daha sonra tekrar deneyin.', 'error');
            }
        });
    }

    isPhoneNumeber(inputtxt) {
        const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return !!(inputtxt.match(phoneno));
    }
}
