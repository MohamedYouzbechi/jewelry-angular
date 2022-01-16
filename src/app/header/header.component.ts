import { Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories:any[];

  constructor(private categoryService:CategoryService,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((cats)=>{
      this.categories = cats;
      console.log(this.categories)
    })
  }

  getProductsByCat(cat:string) : void {
    this.productService.getProductsFromCategory(cat).subscribe((prods)=>{
      this.router.navigate(['/home',cat]);
    })
  }

}
