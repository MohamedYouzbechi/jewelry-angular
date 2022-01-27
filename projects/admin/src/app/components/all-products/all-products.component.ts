import { CategoryService } from '../../services/category.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;
  placeholder: string



  constructor(
    private productService: ProductService,
    private router:Router) {
      this.placeholder = "http://via.placeholder.com/150"
  }

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.productService.getAllProducts().subscribe((prods: {count: number, products: any[]}) => {
      this.products = prods.products;
    }));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  deleteProduct(id: number): void {
    this.subs.push(this.productService.deleteProduct(id).subscribe(
      res => {
        if (res.status === 'success') {
          this.success = true;
          this.errorMessage = res.message;
        }
        this.products = res.products;
        // $('.alert').delay(1500).slideUp(1500);
        setTimeout(()=>{
          this.success = false;
        }, 1500)
      }, (err: HttpErrorResponse)=>{
          this.hasError = true;
          this.errorMessage = err.error.message ? err.error.message : err.error
          setTimeout(()=>{
            this.hasError = false;
          }, 1500)
      }
    ));
  }

  editProduct(id){
    this.router.navigate([`edit-product/${id}`]);
  }

}
