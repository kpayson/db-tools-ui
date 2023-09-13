import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PerfTestResultsDialogComponent } from '../perf-test-results-dialog/perf-test-results-dialog.component';
import { DbToolsService } from '../db-tools.service';
import { DbConnectionsService } from '../db-connections.service';
import { filter } from 'rxjs';



@Component({
  selector: 'app-perf-tests',
  templateUrl: './perf-tests.component.html',
  styleUrls: ['./perf-tests.component.scss'],
  providers: [DialogService]
})
export class PerfTestsComponent implements OnInit {

  ref: DynamicDialogRef | undefined;

  perfTestsAreRunning: boolean = false;

  numVirtualUsers = 10;

  perfTestResultColumns = [
    {
      key:"runDate",
      label:"Run Date"
    },
    {
      key:"vus",
      label:"Number Virtual Users"
    },
    {
      key:"id",
      label:"Report HTML"
    }
  ];


  constructor(
    //private webSocketService: WebSocketService, 
    private dbConnectionsService: DbConnectionsService,
    public dialogService: DialogService,
    public toolsService: DbToolsService,

    ){}

  private openReportDialog(reportHtml:string) {
    this.ref = this.dialogService.open(PerfTestResultsDialogComponent, { 
      data: reportHtml,
      header: 'Import Results',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  ngOnInit(): void {
    this.toolsService.messages$.subscribe(message=>{

      this.perfTestsAreRunning = false;

      this.openReportDialog(message)

      // this.ref = this.dialogService.open(PerfTestResultsDialogComponent, { 
      //   data: message,
      //   header: 'Import Results',
      //   width: '95%',
      //   height: '95%',
      //   contentStyle: { overflow: 'auto' },
      //   baseZIndex: 10000,
      //   maximizable: true
      // });

    })
  }

  runPerfTestClick() {
    this.perfTestsAreRunning = true;
    this.dbConnectionsService.activeConnection.subscribe((conn)=>{
      this.toolsService.sendPayload(conn.id, this.numVirtualUsers);
    })
    
  }

  openReportClick(id:number) {
    console.log('id='+id);
    this.toolsService.perfTestReport(id).subscribe(reportHtml=>{
      // console.log(reportHtml);
      this.openReportDialog(reportHtml);
    })

  } 


}
