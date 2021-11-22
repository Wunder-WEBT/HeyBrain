import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CortexService {
  private url = 'http://localhost:3000';
  private socket;  

  constructor() {
    this.socket = io(this.url)
  }

  public getStreams = () => {
    return Observable.create((observer) => {
      this.socket.on('outputStream', (outputStream) => {
        console.log("cortexService: "+outputStream)
        observer.next(outputStream);
      });
  });
}
  
}