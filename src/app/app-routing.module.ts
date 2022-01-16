import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      // { path: '', component: HomeComponent },
      { path: 'home/:cat', component: HomeComponent },
      { path: 'product/:id', component: ProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
