import { httpInterceptorProviders } from './interceptors/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

import { registerLocaleData } from '@angular/common';
import localeTn from '@angular/common/locales/fr-TN';
registerLocaleData(localeTn, 'tn');

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("703321346219-3nuvk8ciivl6lgi68r6rikn24ejrc5rr.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    ThankyouComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            ToastrModule.forRoot(),
            FormsModule,
            ReactiveFormsModule,
            NgxSpinnerModule,
            SocialLoginModule,
            BrowserAnimationsModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    CookieService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
