import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { CommonService } from '../../core/common.service';
import { fromEvent } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  @ViewChild('inputBox') inputBox!: ElementRef;

  public displayModal!: boolean;

  public displayBasic!: boolean;

  public productForm!: FormGroup;

  public val2: number = 3;

  public title? = '';

  public files: any[];

  public hideSearch = '';

  public userRole: any;

  public price: number = 100;

  public cartOrderList: any = 0;

  public userName = '';

  public stockOption = [
    { name: 'inStock', value: 'In Stock' },
    { name: 'outOfStock', value: 'out of Stock' },
  ];

  constructor(
    private primengConfig: PrimeNGConfig,
    private _fb: FormBuilder,
    private _common: CommonService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.userRole = this._common.getUserData()['id'];
    this.userName = this._common.getUserData()['userName'];
    this.router.events.subscribe((val) => {
      if (
        val instanceof ActivationEnd &&
        val.snapshot.data.hasOwnProperty('title')
      ) {
        this.hideSearch = val.snapshot.data['title'];
        this.title = val.snapshot.data['title'];
      }
    });
    this.files = [];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.productForm = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      img: ['', [Validators.required]],
      price: ['', [Validators.required]],
      inStock: [''],
      isActive: [true],
    });
    this._common.addToCartProduct.subscribe((res) => {
      if(true == res) {
        this.cartOrderList = this._common.myCartProductList;
      }
    });
    this.cartOrderList = this._common.myCartProductList;
  }

  ngAfterViewInit() {
  }

  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  saveData() {
    if (this.productForm.status == 'INVALID') {
      if (!this.productForm.controls['title'].value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Title is required and max length is 50',
        });
      }
      if (!this.productForm.controls['description'].value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Description is required and max length is 150',
        });
      }
      if (!this.productForm.controls['img'].value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Image is required',
        });
      }
      if (!this.productForm.controls['price'].value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Price is required',
        });
      }
    } else {
      if (!this.productForm.controls['inStock'].value) {
        let data: any = {};
        data['name'] = 'inStock';
        data['value'] = 'In Stock';
        this.productForm.controls['inStock'].setValue(data);
      }
      this.displayBasic = false;
      this._common.addProductsItem(this.productForm.value);
      this.productForm.reset();
      this.productForm.controls['isActive'].setValue(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Add Products Successfully',
      });
      this.productForm.controls['img'].patchValue('');
    }
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.productForm.controls['img'].setValue(reader.result);
    });
    reader.readAsDataURL(this.files[0]);
  }

  Logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('cartList');
    this.router.navigate(['login']);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logout SuccessFully',
    });
  }
}
