import { ServerResponse, ProductModelServer } from './../models/product.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SERVER_URL = environment.SERVER_URL;
  searchProducts$ = new BehaviorSubject<any>({});

  limit:string;
  page:string;

  params:any;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.limit = params['limit'];
      this.page = params['page'];

      if (this.limit !== undefined && this.page !== undefined) {
        this.params = new HttpParams()
          .set('limit', this.limit)
          .set('page', this.page);
      }else if (this.limit !== undefined) {
        this.params = new HttpParams().set('limit', this.limit);
      }else if (this.page !== undefined){
        this.params = new HttpParams().set('page', this.page)
      }
    });
  }



  /* This is to fetch all products from the backend server */
  getAllProducts(numberOfResults= 10) : Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.httpClient.get<ProductModelServer>(this.SERVER_URL + '/product/' + id);
  }

  /*GET PRODUCTS FROM ONE CATEGORY */
  getProductsFromCategory(catName: string) : Observable<ServerResponse>  {
    return this.httpClient.get<ServerResponse>(this.SERVER_URL + '/products/category/' + catName, {params: this.params});
  }


  searchProducts(catName: string) {
    console.log(catName)
    return timer(500)
      .pipe(
        switchMap(() => this.httpClient.get<ServerResponse>(this.SERVER_URL + '/products/category/' + catName, {params: this.params})),
      ); // PIPE ENDS HERE
  }

}
