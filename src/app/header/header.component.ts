import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthDataService } from '../services/auth-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(    
    public authService: AuthService,
    public authDataService: AuthDataService){

  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  getUserData() {
    return this.authService.userData;
  }

  // getGroups() {
  //   this.authDataService.getGroups().then((groups) => {
  //     this.groups = groups;
  //     console.log('AppComponent - groups: ', groups);
  //   })
  // }
}
