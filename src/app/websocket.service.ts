
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;

  private _messages$ = new ReplaySubject<string>(); 

  constructor() { 
    this.wsConnect();
  }

  get messages$(){
    return this._messages$.asObservable();
  } 

  wsConnect() {
    this.socket = new WebSocket(environment.webSocketEndpoint); // 'ws://localhost:3000/websocket'

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      this._messages$.next(event.data);

      
      console.log('WebSocket message received:', event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendPayload(connectionId:number, targetVUS:number) {

    //const targetVUS = message.targetVUS || 10;
    //const reportName = message.reportName || "summary.html";
    const perfTestParams = {
      targetVUS,
      connectionId, // connectionId of dbTools connection table
      reportName:'myReport_' + targetVUS + '.html'
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      // this.socket.send(JSON.stringify(perfTestParams));
      this.socket.send(JSON.stringify({
        event: 'events',
        data: perfTestParams,
      }))
    } else {
      console.error('WebSocket connection is not open');
    }
  }
}
