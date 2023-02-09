import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http: HttpClient) { }


  creatNewCart(modal: any) {
    return this.http.post(environment.baseApi + 'carts', modal)
  }
}
