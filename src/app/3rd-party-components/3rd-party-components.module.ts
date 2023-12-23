//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
//import { PrimeIconsModule } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule, SortIcon } from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { TreeModule } from 'primeng/tree';



@NgModule({
  declarations: [],
  imports: [],
  exports: [
    // BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DropdownModule,
    DynamicDialogModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    InputTextModule,
    InputTextareaModule,
    MessagesModule,
    OverlayPanelModule,
    //PrimeIconsModule,
    ProgressSpinnerModule,
    TableModule,
    TabMenuModule,
    ToastModule,
    TreeModule
  ],
  providers: [
  ],
  bootstrap: []
})
export class ThirdPartyComponentsModule {}
