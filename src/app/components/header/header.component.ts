import { ProductService } from './../../services/product.service';
import { UserService } from './../../services/user.service';
import { CartService } from '../../services/cart.service';
import { CartModelServer } from '../../models/cart.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  searchCategory: string;
  selected="0"

  categories:any[];

  constructor(private categoryService:CategoryService,
              private userService: UserService,
              private productService: ProductService,
              public cartService:CartService,
              private router:Router) { }

  ngOnInit(): void {
    // this.categoryService.getAllCategories().subscribe((cats)=>{
    //     this.categories = cats;
    // })

    this.categoryService.allCategories$.subscribe((cats)=>{
      this.categories = cats;
    })

    this.cartService.cartTotal$.subscribe((total)=>{
      this.cartTotal = total;
    })

    this.cartService.cartData$.subscribe((data)=>{
      this.cartData = data;
    })

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  getProductsByCat(SearchForm: NgForm) : void {
    // this.searchCategory = this.activatedRoute.snapshot.paramMap.get('cat');
    let data =SearchForm.value;
    // console.log(SearchForm.value)

    if (data.zoneText) {
      this.router.navigate(['/home', data.zoneText]);
      this.productService.searchProducts(data.zoneText).subscribe((prods)=>{
        this.productService.searchProducts$.next(prods);
      })
    }else if (data.cat_name == '0') {
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/home', data.cat_name]);
      this.productService.searchProducts(data.cat_name).subscribe((prods)=>{
        this.productService.searchProducts$.next(prods);
      })
    }
  }

  logout() {
    this.userService.logout();
  }


}
