import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {

  backEndBaseUrl = environment.backEndBaseUrl;
  
  // dynamic environment variables for localhost and Heroku 
  private orderUrl = `${this.backEndBaseUrl}api/orders`;



  constructor(private httpClient: HttpClient) {}

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailByDateCreatedDesc?email=${theEmail}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl); 
  }
}

 interface GetResponseOrderHistory {
   _embedded: {
     orders: OrderHistory[];
   };
 }
