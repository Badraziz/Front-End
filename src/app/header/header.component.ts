import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  isLogged() {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }
  }
  logout() {
    if (confirm('Are you sure you want to logout ?')) {
    this.authenticationService.logout();
  }else {
    console.log('no thing happen...');
    }
}
}
