import { UserService } from './../../services/user.service';
import { CartService } from '../../services/cart.service';
import { CartModelServer } from '../../models/cart.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;

  categories:any[];

  constructor(private categoryService:CategoryService,
              private userService: UserService,
              public cartService:CartService,
              private router:Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((cats)=>{
      this.categories = cats;
      console.log(this.categories)
    })

    this.cartService.cartTotal$.subscribe((total)=>{
      this.cartTotal = total;
    })

    this.cartService.cartData$.subscribe((data)=>{
      this.cartData = data;
    })

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  getProductsByCat(cat:string) : void {
    this.router.navigate(['/home',cat]);
  }

}
