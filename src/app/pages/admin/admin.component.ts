import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../base/services/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(storageService: SessionService, router: Router) {
    if (!storageService.getItem('user')) {
      router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
  }

}
