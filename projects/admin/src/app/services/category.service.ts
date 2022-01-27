import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) { }

  deleteCategory(catId): Observable<any> {
    return this.httpClient
      .delete<{ message?: string; status: string }>(
        `http://localhost:3000/category/${catId}`
      )
      .pipe(
        switchMap(async (data) => {
          const cats = await this.getAllCategories().toPromise();
          return {
            ...data,
            cats : cats,
          };
        })
      );
  }

  editCategory(catId, dataCat): Observable<any>{
    return this.httpClient
      .patch<{ message?: string; status: string }>(`http://localhost:3000/category/${catId}`, dataCat)
      .pipe(
        switchMap(async (data) => {
          const cats = await this.getAllCategories().toPromise();
          return {
            ...data,
            cats : cats,
          };
        })
      );
  }

    /*GET ALL CATEGORIES */
    getAllCategories() : Observable<any[]>  {
      return this.httpClient.get<any[]>(this.SERVER_URL + '/categories');
    }

    /*ADD CATEGORY */
    addCategory(dataCat) : Observable<any>  {
      return this.httpClient.post<{message: string, success: boolean}>(this.SERVER_URL + '/addCategory', dataCat)
      .pipe(
        switchMap(async (data) => {
          const cats = await this.getAllCategories().toPromise();
          return {
            ...data,
            cats : cats,
          };
        })
      );
    }
}
