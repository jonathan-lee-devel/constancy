import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {CookiesNoticeService} from "../../../services/cookies-notice/cookies-notice.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,
              private cookiesNoticeService: CookiesNoticeService) {
  }


  ngOnInit() {
    this.authService.checkKeycloakLoginStatus();
    this.cookiesNoticeService.triggerIfNotAccepted();
  }

}
