import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  constructor(
      public location: Location,
  ) { }

  ngOnInit(): void {
  }

    onSubmit() {
        this.location.back();
    }
}
