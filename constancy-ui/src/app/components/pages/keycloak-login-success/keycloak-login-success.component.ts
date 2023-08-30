import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-keycloak-login-success',
  templateUrl: './keycloak-login-success.component.html',
  styleUrls: ['./keycloak-login-success.component.css']
})
export class KeycloakLoginSuccessComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.onSuccessfulKeycloakLogin();
  }

}
