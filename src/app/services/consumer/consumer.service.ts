import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IIPC } from 'src/app/models/ipc.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  constructor(private http: HttpClient) { }

  get(url:string){
    return this.http.get<IIPC[]>(url);
  }
}
