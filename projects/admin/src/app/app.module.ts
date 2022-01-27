import { httpInterceptorProviders } from './interceptors/index';
import { DefaultImage } from './pipe/default-image.pipe';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {AllProductsComponent} from './components/all-products/all-products.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { CookieService } from 'ngx-cookie-service';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

import { registerLocaleData } from '@angular/common';
import localeTn from '@angular/common/locales/fr-TN';
registerLocaleData(localeTn, 'tn');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MainContentComponent,
    AllProductsComponent,
    AllCategoriesComponent,
    AllUsersComponent,
    AllOrdersComponent,
    DefaultImage,
    AddEditProductComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
