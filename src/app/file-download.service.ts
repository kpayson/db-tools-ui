import { Injectable } from '@angular/core';
// import { parse } from 'json2csv';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {
  public jsonFileDownload(data: string, fileName: string) {
    this.fileDownload(data, fileName, 'text/json');
  }

  public xmlFileDownload(data: string, fileName: string) {
    this.fileDownload(data, fileName, 'text/xml');
  }

  public textFileDownload(data: string, fileName: string) {
    this.fileDownload(data, fileName, 'text/plain');
  }

  public plainFileDownload(data: string, fileName: string) {
    this.fileDownload(data, fileName, 'application/x-empty');
  }

  // public csvFileDownload(data: any, fileName: string) {
  //   const csv = parse(data);
  //   this.fileDownload(csv, fileName, 'application/csv');
  // }

  private fileDownload(data: string, fileName: string, mimeType: string): void {
    const dataStr = `data:${mimeType};charset=utf-8,${encodeURIComponent(
      data
    )}`;
    const downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', fileName);

    document.body.appendChild(downloadAnchorNode); // required for firefox

    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
