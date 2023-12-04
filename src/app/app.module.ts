import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThirdPartyComponentsModule } from './3rd-party-components/3rd-party-components.module';
import { TablesAndColumnsSelectorComponent } from './tables-and-columns-selector/tables-and-columns-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { TablesAndColumnsViewerComponent } from './tables-and-columns-viewer/tables-and-columns-viewer.component';
import { DbExportComponent } from './db-export/db-export.component';
import { DbImportComponent } from './db-import/db-import.component';
import { DbViewerComponent } from './db-viewer/db-viewer.component';
import { DbSeederComponent } from './db-seeder/db-seeder.component';
import { ImportResultsDialogComponent } from './import-results-dialog/import-results-dialog.component';
import { PerfTestsComponent } from './perf-tests/perf-tests.component';
import { PerfTestResultsDialogComponent } from './perf-test-results-dialog/perf-test-results-dialog.component';
import { SafeUrlPipe } from './safe-url.pipe'
import { SanitizedHtmlPipe } from './sanitized-html.pipe';
import { DbConnectionsComponent } from './db-connections/db-connections.component';

import { ServerJobsComponent } from './server-jobs/server-jobs.component';
import { JobResultsDialogComponent } from './job-results-dialog/job-results-dialog.component';
import { AuthConfigModule } from './services/auth-config.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { DbConnectionUpsertDialogComponent } from './db-connection-upsert-dialog/db-connection-upsert-dialog.component';
import { ServerJobUpsertDialogComponent } from './server-job-upsert-dialog/server-job-upsert-dialog.component';
import { CustomViewsComponent } from './custom-views/custom-views.component';
import { CustomViewsUpsertDialogComponent } from './custom-views-upsert-dialog/custom-views-upsert-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TablesAndColumnsSelectorComponent,
    TablesAndColumnsViewerComponent,
    DbExportComponent,
    DbImportComponent,
    DbViewerComponent,
    DbSeederComponent,
    ImportResultsDialogComponent,
    PerfTestsComponent,
    PerfTestResultsDialogComponent,
    SanitizedHtmlPipe,
    SafeUrlPipe,
    DbConnectionsComponent,
    ServerJobsComponent,
    JobResultsDialogComponent,
    HomeComponent,
    HeaderComponent,
    DbConnectionUpsertDialogComponent,
    ServerJobUpsertDialogComponent,
    CustomViewsComponent,
    CustomViewsUpsertDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThirdPartyComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthConfigModule
  ],
  providers: [FileReader, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// @NgModule({
//   declarations: [AppComponent, TestpageComponent],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,
//     AuthConfigModule
//   ],
//   providers: [
//     AuthService
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
