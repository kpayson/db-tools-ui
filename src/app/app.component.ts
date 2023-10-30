import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { AuthDataService } from './services/auth-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // title = 'db tools application';
  // groups: any[] = [];
  // user: any = null;

  constructor(
    // private router: Router,
    // public authService: AuthService,
    // public authDataService: AuthDataService
  ) {}

  ngOnInit(): void {}

  // openNewTab(path: string) {
  //   const url = this.router.serializeUrl(this.router.createUrlTree([path]));
  //   window.open(url, '_blank');
  // }

  // login() {
  //   this.authService.login();
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // getUserData() {
  //   return this.authService.userData;
  // }

  // getGroups() {
  //   this.authDataService.getGroups().then((groups) => {
  //     this.groups = groups;
  //     console.log('AppComponent - groups: ', groups);
  //   })
  // }
}