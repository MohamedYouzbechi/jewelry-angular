import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  productForm:FormGroup;
  imagePreview:string;
  product:any = {};

  messageSuccess = '';
  messageErr = "";

  categories:any[];
  selectedCategory;

  // edit:boolean = false;
  id;
  title:string="Add"

  constructor(
    private productService: ProductService,
    private categoryService:CategoryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      img:['']
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id).subscribe(
        async (data)=>{
          this.product = data;
          // console.log(this.product)
          this.categories = await this.categoryService.getAllCategories().toPromise();
          // console.log(this.categories)
          this.imagePreview = data.image;
        },(err: HttpErrorResponse)=>{
          this.messageErr = err.error;
        }
      );
      this.title="Edit"
    }else{
      this.categoryService.getAllCategories().subscribe((cats)=>{
        this.categories = cats;
      })
    }

  }


  addEditProduct(f:any){
    this.messageSuccess = '';
    this.messageErr="";
    let data = f.value;

    if (f.invalid) {
      console.log('form invalid')
      return
    }

    if (this.id) {
      this.productService.editProduct(this.product.id, data, this.productForm.value.img).subscribe(res=> {
          if (res.status === 'success') {
            this.messageSuccess = res.message;
            setTimeout(() => {
              this.messageSuccess = '';
            }, 1500);
            // f.reset();
          }
      }, (err: HttpErrorResponse)=>{
          this.messageErr = err.error;
      })
    }else{
      this.productService.addProduct(data, this.productForm.value.img).subscribe(res=> {
        if (res.status === 'success') {
          this.messageSuccess = res.message;
          setTimeout(() => {
            this.messageSuccess = '';
          }, 1500);
          // f.reset();
          this.imagePreview = ''
        }
      }, (err: HttpErrorResponse)=>{
        this.messageErr = err.error;
      })
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];//pour get limage choisi (files[0]:on a une seule image dans notre cas: cela signefi que on peut choisir plusieurs files)
    this.productForm.patchValue({ img: file }); // c'est pour patcher l'image dans l'attr img
    this.productForm.updateValueAndValidity(); // c'est pour actualiser productForm
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string // c'est pour transformer l'image en string (base64)
    };
    reader.readAsDataURL(file);
    }

}
