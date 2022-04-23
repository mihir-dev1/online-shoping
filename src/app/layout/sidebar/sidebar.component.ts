import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public userRole:any;

  constructor(private _common:CommonService) { 
    this.userRole = this._common.getUserData()['id']
  }

  ngOnInit(): void {
  }

}
