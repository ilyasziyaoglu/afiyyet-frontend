import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {UserService} from "../../../base/services/user.service";

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    NgIf,
    RouterLink
  ],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss'
})
export class ReportingComponent {
  constructor(
      public userService: UserService,
      public router: Router,
  ) {

  }
}
