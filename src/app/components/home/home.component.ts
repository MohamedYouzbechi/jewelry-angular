import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductModelServer, ServerResponse } from '../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:ProductModelServer[]=[];
  category:string;


  constructor(private router:Router,
              private productService:ProductService,
              private cartService:CartService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.category = this.activatedRoute.snapshot.paramMap.get('cat');
    // console.log('cat from home',this.category)
    // if (this.category) {
    //   this.productService.getProductsFromCategory(this.category).subscribe((prods:ServerResponse)=>{
    //     this.products = prods.products;
    //   })
    //   console.log('1')
    // }else{
    //   this.productService.getAllProducts().subscribe((prods:ServerResponse)=>{
    //     this.products = prods.products;
    //   })
    //   console.log('2')
    // }
    /********************* */
    this.productService.searchProducts$.subscribe((prods:ServerResponse)=>{
      this.products = prods.products;
    })

    if (!this.category) {
      this.productService.getAllProducts().subscribe((prods:ServerResponse)=>{
        this.productService.searchProducts$.next(prods);
      })
    }
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }
}
