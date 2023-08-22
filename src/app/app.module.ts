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

@NgModule({
  declarations: [
    AppComponent,
    TablesAndColumnsSelectorComponent,
    TablesAndColumnsViewerComponent,
    DbExportComponent,
    DbImportComponent,
    DbViewerComponent,
    DbSeederComponent
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
