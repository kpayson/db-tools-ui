import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-data-report-result-dialog',
  templateUrl: './data-report-result-dialog.component.html',
  styleUrls: ['./data-report-result-dialog.component.scss']
})
export class DataReportResultDialogComponent implements OnInit {
  safeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {

  }
  ngOnInit(): void {
    if(this.config.data) {
      this.safeHtml = this.config.data;
    }
  }

  pdfDownload() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.config.data, 'text/html');
    const nodeElement = doc.body;

    const pdf = new jsPDF();
    //window.print()

    pdf.html(nodeElement, {
      callback: function (pdf) {
    
        // Save the PDF to a file or display it
        pdf.save("output.pdf");
      },
      //margin: [72, 72, 72, 72],
        autoPaging: 'text',
        html2canvas: {
            allowTaint: true,

            // dpi: 300,
            letterRendering: true,
            logging: false,
            scale: .8,

        },
        // fontFaces:[
        //   {family: 'Roboto', style:'normal', src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf'},
        // {family:'Times New Roman',style:'normal', src:'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Times_New_Roman/times.ttf'}]
    });

  }

  sendEmail() {
    
  }
}


// family	string		
// The name of the font-family.

// style	string | undefined		
// The style that this font-face defines, e.g. 'italic'.

// weight	string | number | undefined		
// The weight of the font, either as a string or a number (400, 500, 600, e.g.)

// stretch	string | undefined		
// The stretch of the font, e.g. condensed, normal, expanded.

// src	Array.<Object>

// var doc = new jsPDF();

// doc.html(document.body, {
//    callback: function (doc) {
//      doc.save();
//    },
//    x: 10,
//    y: 10
// });


// document.addEventListener("DOMContentLoaded", function () {

//   const pdf = new jsPDF();
//   const element = document.body;
 
//   pdf.html(element, {
//    callback: function (pdf) {
 
//  // Save the PDF to a file or display it
//     pdf.save("output.pdf");
//    },
//   });
//  });


// const htmlString = '<div><p>Hello, world!</p></div>';

// const parser = new DOMParser();
// const doc = parser.parseFromString(htmlString, 'text/html');
// const nodeElement = doc.body.firstChild;