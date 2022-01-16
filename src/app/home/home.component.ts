import { ProductService } from './../services/product.service';
import { ProductModelServer, ServerResponse } from './../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.category = this.activatedRoute.snapshot.paramMap.get('cat');
    console.log(this.category)
    if (this.category) {
      this.productService.getProductsFromCategory(this.category).subscribe((prods:ServerResponse)=>{
        this.products = prods.products;
      })
      console.log('1')
    }else{
      this.productService.getAllProducts().subscribe((prods:ServerResponse)=>{
        this.products = prods.products;
      })
      console.log('2')
    }
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

  AddToCart(id: number) {
    // this.cartService.AddProductToCart(id);
  }
}
