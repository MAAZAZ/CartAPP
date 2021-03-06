import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService extends DataService{

  constructor(http: HttpClient) {
    super('http://127.0.0.1:9000/carts/', http);
  }
}
