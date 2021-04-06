import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  // localhost
  private orderUrl = 'http://localhost:8080/api/orders';

  // Heroku
  // private orderUrl = 'https://newfullybakery-backend.herokuapp.com/api/orders';

  constructor(private httpClient: HttpClient) {}

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl); 
  }
}

 interface GetResponseOrderHistory {
   _embedded: {
     orders: OrderHistory[];
   };
 }
