import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  /*GET ALL CATEGORIES */
  getAllCategories() : Observable<any[]>  {
    return this.httpClient.get<any[]>(this.SERVER_URL + '/categories/');
  }
}
