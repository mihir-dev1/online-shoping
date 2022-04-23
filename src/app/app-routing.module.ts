import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuardGuard } from './core/active-guard.guard';
import { AdminGuard } from './core/admin.guard';
import { CartGuard } from './core/cart.guard';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './login/login.component';
import { MyCartComponent } from './modules/my-cart/my-cart.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { TrashProductComponent } from './modules/trash-product/trash-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate:[ActiveGuardGuard],
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./modules/product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
        data: {
          title: 'List',
        },
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
        data: {
          title: 'Details',
        },
      },
      {
        path: 'delete-products',
        component: TrashProductComponent,
        canActivate:[AdminGuard],
        data: {
          title: 'Trash',
        },
      },
      {
        path: 'view-cart',
        component:MyCartComponent,
        canActivate:[CartGuard]
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'**',
    redirectTo:'list'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
