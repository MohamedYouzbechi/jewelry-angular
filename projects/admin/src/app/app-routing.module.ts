import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminGuard } from './guard/admin.guard';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainContentComponent} from './components/main-content/main-content.component';
import {AllProductsComponent} from './components/all-products/all-products.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AdminGuard],
    children : [
      {
        path: '',
        component: MainContentComponent,
      },
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
      {
        path: 'add-product',
        component: AddEditProductComponent,
      },
      {
        path: 'edit-product/:id',
        component: AddEditProductComponent,
      },
      {
        path: 'all-categories',
        component: AllCategoriesComponent,
      },
      {
        path: 'all-users',
        component: AllUsersComponent,
      },
      {
        path: 'all-orders',
        component: AllOrdersComponent,
      }
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
