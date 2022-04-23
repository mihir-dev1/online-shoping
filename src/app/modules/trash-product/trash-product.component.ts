import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../core/common.service';


@Component({
  selector: 'app-trash-product',
  templateUrl: './trash-product.component.html',
  styleUrls: ['./trash-product.component.scss']
})
export class TrashProductComponent implements OnInit {
  public productList: any;

  constructor(private _common: CommonService) { }

  ngOnInit(): void {
    this._common.addItem.subscribe((res) => {
      if (res === true) {
        let prodList = localStorage.getItem('productItem');
        this.productList = JSON.parse(JSON.stringify(prodList));
        this.productList = JSON.parse(this.productList);
      }
    });
    let prodList = localStorage.getItem('productItem');
    this.productList = JSON.parse(JSON.stringify(prodList));
    this.productList = JSON.parse(this.productList);
  }

  productDetails(id:number) {
    this._common.navigateTo('product-details/'+id)
  }

  addProduct(item:any) {
    item['isActive'] = true;
    // softDelete
    this._common.removeProductsItem(item,'softDelete');
  }

  deleteItem(item:any) {
    this._common.removeProductsItem(item,'hardDelete');
  }

}
