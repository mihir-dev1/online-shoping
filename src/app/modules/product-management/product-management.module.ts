import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';

import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [ProductManagementComponent],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    // RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    BadgeModule,
    ToastModule,
    RippleModule,
    CarouselModule,
    DataViewModule,
    PanelModule,
    RatingModule,
    InputNumberModule
  ],
})
export class ProductManagementModule {}
