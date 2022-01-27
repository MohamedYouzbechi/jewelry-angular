import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private SERVER_URL = environment.SERVER_URL;

  allCategories$ = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) {
    this.getAllCategories().subscribe((cats)=>{
        this.allCategories$.next(cats);
    })
  }

  /*GET ALL CATEGORIES */
  getAllCategories() : Observable<any[]>  {
    return this.httpClient.get<any[]>(this.SERVER_URL + '/categories');
  }
}
