import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public prodId!: number;
  public prodDetails: any;
  public productList;
  constructor(public router: ActivatedRoute,public _common:CommonService,private _router:Router) {
    this.router.params.subscribe((params) => (this.prodId = params['id']));
    let prodList = localStorage.getItem('productItem');
    if (prodList) {
      let data = JSON.parse(JSON.stringify(prodList));
      this.productList = JSON.parse(data);
      this.prodDetails = this.productList[this.prodId];
    }
  }

  ngOnInit(): void {}

  addProduct() {
    // debugger
    let duplicate = this._common.myCartProductList.findIndex(item => item['title'] === this.prodDetails['title']);
    if(duplicate == 0) {
      this._router.navigate(['/view-cart']);
    } else {
      this._router.navigate(['/view-cart']);
      this._common.addToCart(this.prodDetails);
    }
  }
}
