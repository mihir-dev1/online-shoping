import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/common.service';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
  providers: [MessageService],
})
export class MyCartComponent implements OnInit {
  public cartList: any;
  public tempData: any;
  public finalPrice: any = 0;
  constructor(
    private _common: CommonService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this._common.addToCartProduct.subscribe((res) => {
      if (res === true) {
        let cartProd = localStorage.getItem('cartList');
        this.cartList = JSON.parse(JSON.stringify(cartProd));
        this.tempData = this.cartList = JSON.parse(this.cartList);
        if(this.cartList) {
          this.finalPrice = 0;
          this.cartList.forEach((item: any) => {
            this.finalPrice += item['displayPrice'];
          });
        }
      }
    });
    let cartProd = localStorage.getItem('cartList');
    this.cartList = JSON.parse(JSON.stringify(cartProd));
    this.tempData = this.cartList = JSON.parse(this.cartList);
    if(this.cartList) {
      this.finalPrice = 0;
      this.cartList.forEach((item: any) => {
        this.finalPrice += item['displayPrice'];
      });
    }
  }

  removeCartProductItem(data: any) {
    this._common.removeCartProduct(data);
  }

  addProd(id: any) {
    let selectedItem: any = document.getElementById(id);
    if (selectedItem.value == 10) {
      selectedItem.value = 10;
      this.messageService.add({
        severity: 'info',
        summary: 'info',
        detail: 'only select 10 items only',
      });
    } else {
      this.cartList[id].quantity = this.cartList[id].quantity;
      this.cartList[id].quantity++;
      let price = this._common.productList.filter(item => item['title'] ===  this.tempData[id].title);
      this.cartList[id].displayPrice = price[0]['price'] * this.cartList[id].quantity;
      if(this.cartList) {
        this.finalPrice = 0;
        this.cartList.forEach((item: any) => {
          this.finalPrice += item['displayPrice'];
        });
      }
    }
    this._common.updateCartProd(this.cartList[id],id);
  }

  removeProd(id: any) {
    let selectedItem: any = document.getElementById(id);
    if (selectedItem.value == 1) {
      selectedItem.value = 1;
    } else {
      this.cartList[id].quantity = this.cartList[id].quantity;
      this.cartList[id].quantity--;
      let price = this._common.productList.filter(item => item['title'] ===  this.tempData[id].title);
      this.cartList[id].displayPrice = price[0]['price'] * this.cartList[id].quantity;
      if(this.cartList) {
        this.finalPrice = 0;
        this.cartList.forEach((item: any) => {
          this.finalPrice += item['displayPrice'];
        });
      }
    }
  }

  checkoutDetails() {
    this.messageService.add({
      severity: 'success',
      summary: 'success',
      detail: `${this.cartList.length} items purchase successfully`,
    });
  }
}
