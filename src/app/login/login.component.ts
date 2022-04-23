import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../core/common.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loginFormControls: any;
  public isError!: boolean;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _common: CommonService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginForm = this._fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }


  login() {
    // debugger
    if (this.loginForm.valid) {
      this.isError = false;
      const formBody = this.loginForm.value;
      let userValid = this._common.userList.find(
        (item) =>
          item.email === formBody['email'] &&
          item.password === formBody['password']
      );
      this.saveUserDataToLocalStorage(userValid);
      if (userValid) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login Successfully',
        });
        this.router.navigate(['/']);
      } else {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Please Enter Valid Email and Password'});
      }
    } else {
      this.isError = true;
      const formBody = this.loginForm;
    }
  }

  saveUserDataToLocalStorage(userData: any) {
    localStorage.removeItem('cartList');
    this._common.addToCartProduct.next(false);
    let tempUserData =  window.btoa(JSON.stringify(userData));
    localStorage.setItem('userData', tempUserData);
  }
}
