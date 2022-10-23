import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Product } from '../_interfaces/product';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') || ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private productSubject: BehaviorSubject<Product>;
  public product: Observable<Product>;
  private subject: Subject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.productSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('product') || '{}'));
    this.product = this.productSubject.asObservable();
    this.subject = new Subject<any>()
  }

  public get productValue(): any {
    return this.productSubject.value;
  }

  register(product: any) {

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.post(`${environment.apiUrl}/produtos`, product, httpOptions);
  }

  getByID(id: number) {

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.get(`${environment.apiUrl}/produtos/${id}`, httpOptions);
  }

  getAllProducts() {

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.get<any[]>(`${environment.apiUrl}/produtos`, httpOptions);
  }

  removeProduct(id: number) {

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.delete(`${environment.apiUrl}/produtos/${id}`, httpOptions);
  }

  getTotal(item_list: any) {

    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

    return this.http.put(`${environment.apiUrl}/produtos`, item_list, httpOptions);
  }

  // Inter-component communication

  updateProductsAdd(product: Object) {
    console.log("AddProducts called")
    this.subject.next({ product: product, update: 'add' });
  }

  updateProductsRemove(product: any) {
    console.log("RemoveProducts called")
    this.subject.next({ product: product.produto, update: 'remove' });
  }

  getProductsUpdate(): Observable<any> {
    console.log("getProductsUpdate called")
    return this.subject.asObservable();
  }
}
