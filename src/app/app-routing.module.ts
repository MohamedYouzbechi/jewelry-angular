import { NoguardUserGuard } from './guard/noguard-user.guard';
import { ProfileGuard } from './guard/profile.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoguardAdminGuard } from 'projects/admin/src/app/guard/noguard-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home/:cat', component: HomeComponent },
      { path: 'product/:id', component: ProductComponent },
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent, canActivate: [ProfileGuard]},
      {path: 'thankyou', component: ThankyouComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent, canActivate: [NoguardUserGuard, NoguardAdminGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
