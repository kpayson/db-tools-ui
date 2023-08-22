import { Component } from '@angular/core';
import { DbToolsService } from '../db-tools.service';

@Component({
  selector: 'app-db-import',
  templateUrl: './db-import.component.html',
  styleUrls: ['./db-import.component.scss']
})
export class DbImportComponent {

  constructor(private reader: FileReader, private toolsService: DbToolsService) { }

  onUpload(evnt: any) {
    console.log(evnt)
    const fileToUpload = evnt.files[0]
    this.reader.onload = this.handleFileLoad.bind(this);
    this.reader.readAsText(fileToUpload);
  }

  uploadHandler(evnt: any) {
    console.log(evnt)
    const fileToUpload = evnt.files[0]
    this.reader.onload = this.handleFileLoad.bind(this);
    this.reader.readAsText(fileToUpload);
  }

  handleFileLoad(event: any) {
    const fileText = event.target.result;
    this.toolsService.importData(fileText);
  }
}
