import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../../../services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations;

  constructor(reservationService: ReservationService) {
    reservationService.getAllReservations(res => {
      this.reservations = res;
    });

    // let reservation = {
    //   adultCount: 2,
    //   brand: {id: 3},
    //   childCount: 3,
    //   fullName: "Emil Mammadov",
    //   phoneNumber: "+905531585453",
    //   reservationDate: "2020-12-02T12:20:10.410Z",
    //   specifications: "Burada kucuk bir yorum kismi olacak. O kisma yorumlar gelecek"
    // }
    //
    // reservationService.insertReservation(reservation, cb => {
    //   console.log("cb", cb);
    // })

  }

  ngOnInit(): void {
  }

  convertDateString(strDate) {
    return new Date(strDate).toLocaleString('en-GB').slice(0, -3);
  }

}
