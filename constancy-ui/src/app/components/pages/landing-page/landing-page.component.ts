import {Component, OnInit} from '@angular/core';
import {CookiesNoticeService} from '../../../services/cookies-notice/cookies-notice.service';
import {LoadingService} from '../../../services/loading/loading.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  private isLoadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor(
      private authService: AuthService,
      private cookiesNoticeService: CookiesNoticeService,
      private loadingService: LoadingService,
  ) {
    this.loadingService.isLoadingMapObservable()
        .subscribe((isLoadingMap) => {
          this.isLoadingMap = isLoadingMap;
        });
  }

  ngOnInit() {
    this.authService.checkKeycloakLoginStatus();
    this.cookiesNoticeService.triggerIfNotAccepted();
  }
}
