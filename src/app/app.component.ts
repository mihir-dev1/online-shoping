import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { CommonService } from './core/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public logoutInterval: any;

  constructor(private _router:Router,private _common:CommonService) {

  }
  
  ngOnInit(): void {
    this.logoutInterval = interval(3 * 1000).subscribe((x) => {
      // debugger
      let userData = localStorage.getItem('userData');
      if (userData === null) {
        this.logoutUser();
      }
    });
  }

  logoutUser() {
    // this._toastMsg.success('Logout SuccessFully');
    // localStorage.clear();
    this.logoutInterval.unsubscribe();
    this._router.navigate(['login']);
  }

}
