import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Role } from './modal/role';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public userList = [
    {
      id: 1,
      userName: 'admin',
      password: 'admin',
      email: 'admin@gmail.com',
    },
    {
      id: 2,
      userName: 'user',
      password: 'user',
      email: 'user@gmail.com',
    },
  ];
  public addItem = new BehaviorSubject<boolean>(false);
  public addToCartProduct = new BehaviorSubject<boolean>(false);
  public searchData = new BehaviorSubject<any>('');
  public productList: any[] = [];
  public trashItem: string[] = [];
  public myCartProductList: any[] = [];

  constructor(private _router: Router) {
    let prodList = localStorage.getItem('productItem');
    if (prodList) {
      let data = JSON.parse(JSON.stringify(prodList));
      this.productList = JSON.parse(data);
    }
    let addToCart = localStorage.getItem('cartList');
    if (addToCart) {
      let data = JSON.parse(JSON.stringify(addToCart));
      this.myCartProductList = JSON.parse(data);
    }
  }

  getUserData() {
    let userData = localStorage.getItem('userData');
    return this.decodeData(userData);
  }

  getUserId() {
    this.getUserData()['id'];
  }

  encodeData(data: any) {
    return window.btoa(data);
  }

  decodeData(data: any) {
    return JSON.parse(window.atob(data));
  }

  get router(): Router {
    return this._router;
  }

  /**
   * This method is used to redirect to specified url
   * @param url
   */
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  addProductsItem(data: any) {
    this.productList.push(data);
    let prod = JSON.stringify(this.productList);
    localStorage.setItem('productItem', prod);
    this.addItem.next(true);
  }

  addToCart(data: any) {
    let itemList: any = {};
    itemList = data;
    itemList['quantity'] = 1;
    itemList['displayPrice'] = data['price'];
    this.myCartProductList.push(data);
    let cartProd = JSON.stringify(this.myCartProductList);
    localStorage.setItem('cartList', cartProd);
    this.addToCartProduct.next(true);
  }

  updateProd(data: any, id: any) {
    this.productList[id] = data;
    let prod = JSON.stringify(this.productList);
    localStorage.setItem('productItem', prod);
    this.addItem.next(true);
  }

  updateCartProd(data: any, id: any) {
    this.myCartProductList[id] = data;
    let cartProd = JSON.stringify(this.myCartProductList);
    localStorage.setItem('cartList', cartProd);
  }

  searchItem(input: any) {}

  removeProductsItem(data: any, type: any) {
    this.productList = this.productList.filter(
      (item: any) => !(item['title'] === data['title'])
    );
    if (type === 'softDelete') {
      this.productList.push(data);
    }
    let prod = JSON.stringify(this.productList);
    localStorage.setItem('productItem', prod);
    this.addItem.next(true);
  }

  removeCartProduct(data: any) {
    this.myCartProductList = this.myCartProductList.filter(
      (item: any) => !(item['title'] === data['title'])
    );
    let cartProd = JSON.stringify(this.myCartProductList);
    localStorage.setItem('cartList', cartProd);
    this.addToCartProduct.next(true);
  }
}
