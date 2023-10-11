import { Component, OnInit } from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    userData$!: Observable<UserDataResult>;
    isAuthenticated = false;

  constructor(public oidcSecurityService: OidcSecurityService, private reader: FileReader){}

  ngOnInit() {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);
      }
    );

    this.userData$ = this.oidcSecurityService.userData$;
  }

  title = 'db-tools-ui';

  selectedTab = 'export';

  items = [
    {
      label: "Connection",
      command: (event: any) => {
        this.selectedTab = 'connection';
      }
    },
    {
      label: "View",
      command: (event: any) => {
        this.selectedTab = 'view';
      }
    },
    {
      label: "Export",
      command: (event: any) => {
        this.selectedTab = 'export';
      }
    },
    {
      label: "Import",
      command: (event: any) => {
        this.selectedTab = 'import';
      }
    },
    {
      label: "Seed",
      command: (event: any) => {
        this.selectedTab = 'seed';
      }
    },
    {
      label: "Perf Tests",
      command: (event: any) => {
        this.selectedTab = 'perftest';
      }
    },
    {
      label: "Server Jobs",
      command: (event: any) => {
        this.selectedTab = 'serverjob';
      }
    },

  ];

  exportClick() {

  }

  importClick() {

  }

  onUpload(evnt:any) {
    console.log(evnt)
    const fileToUpload = evnt.files[0]
    this.reader.onload = this.handleFileLoad.bind(this);
    this.reader.readAsText(fileToUpload);
  }

  // handleFileInput(files: FileList) {
  //   const fileToUpload = files.item(0);
  //   this.reader.onload = this.handleFileLoad.bind(this);
  //   this.reader.readAsText(fileToUpload);
  // }

  handleFileLoad(event:any) {
    const fileText = event.target.result;
    console.log(fileText);

    // try {
    //   const parsed = JSON.parse(fileText);
    //   if (!parsed.id || !parsed.name || !parsed.identifier) {
    //     throw new Error('missing required fields');
    //   }
    //   this.importedApi = parsed;
    //   this.importErrors = [];
    // } catch (e) {
    //   this.importErrors = [
    //     'An error occurred while processing the import file'
    //   ];
    //   this.importedApi = null;
    // }
  }

}


// import { Component, OnInit } from '@angular/core';
// import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.component.html',
// })
// export class HomeComponent implements OnInit {
//   userData$: Observable<UserDataResult>;
//   isAuthenticated = false;

//   constructor(public oidcSecurityService: OidcSecurityService) {}

//   ngOnInit() {
//     this.oidcSecurityService.isAuthenticated$.subscribe(
//       ({ isAuthenticated }) => {
//         this.isAuthenticated = isAuthenticated;

//         console.warn('authenticated: ', isAuthenticated);
//       }
//     );

//     this.userData$ = this.oidcSecurityService.userData$;
//   }
// }