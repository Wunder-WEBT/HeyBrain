import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class SimulationcortexService {
  private url = 'http://localhost:2108';
  private socket;  

  constructor() {
    this.socket = io(this.url)
  }

  public getStreams = () => {
    return Observable.create((observer) => {
      this.socket.on('sendData', (sendData) => {
        observer.next(sendData);
        
      });
  });
}
  
}