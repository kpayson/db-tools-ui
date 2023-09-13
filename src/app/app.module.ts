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
import { ServerScriptsComponent } from './server-scripts/server-scripts.component';

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
    ServerScriptsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThirdPartyComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FileReader],
  bootstrap: [AppComponent]
})
export class AppModule { }
