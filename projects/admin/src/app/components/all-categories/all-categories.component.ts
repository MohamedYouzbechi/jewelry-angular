import { CategoryService } from './../../services/category.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {

  cats: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;
  edit:boolean;

  dataCategory:any = {}
  messageSuccess = '';
  messageErr = "";


  constructor(private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.categoryService.getAllCategories().subscribe((cats)=>{
      this.cats = cats;
    }));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  deleteCategory(id: number): void {
    this.subs.push(this.categoryService.deleteCategory(id).subscribe(
      res => {
        if (res.status === 'failure') {
          this.hasError = true;
          this.errorMessage = res.message;
        }

        if (res.status === 'success') {
          this.success = true;
          this.errorMessage = res.message;
        }

        this.cats = res.cats;
        $('.alert').delay(1500).slideUp(1500);
      }
    ));
  }

  getdata(id:number, title:string, action:boolean){
    this.edit = action;
    this.messageSuccess = '';
    this.messageErr="";
    this.dataCategory.id = id;
    this.dataCategory.title = title;
  }

  addEditCategory(f:any){
    this.messageSuccess = '';
    this.messageErr="";
    let data = f.value;

    if ( this.edit) {
      this.categoryService.editCategory(this.dataCategory.id, data).subscribe(res=> {

        if (res.status === 'success') {
          this.messageSuccess = res.message;
        }

        this.cats = res.cats;
      }, (err:HttpErrorResponse)=>{
        this.messageErr = err.error.message;
        console.log(this.messageErr)
    })
    }else{
      this.categoryService.addCategory(data).subscribe(res=> {
        if (!res.success) {
          this.messageErr = res.message;
        }else{
          this.messageSuccess = res.message;
          f.reset();
          setTimeout(() => {
            this.messageSuccess = '';
          }, 1500);
        }

        this.cats = res.cats;
      })
    }
  }
}
