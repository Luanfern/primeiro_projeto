import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3001/produtos';

  constructor(
    private snackbar: MatSnackBar,
    private httpclient: HttpClient
    ) { }

    showmessage(msg: string, isError: boolean = false): void{
      this.snackbar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: isError ? ["msg-error"] : ["msg-sucess"]
      });
    }

    criarproduto(product: Product): Observable<Product>{
    return this.httpclient.post<Product>(this.baseURL, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorconect(e))
      );
  }

  lerprodutos(): Observable<Product[]>{
    return this.httpclient.get<Product[]>(this.baseURL).pipe(
      map((obj) => obj),
      catchError(e => this.errorconect(e))
      );
  }

  lerporid(id: string): Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.httpclient.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorconect(e))
      );
  }

  atualizarproduto(product: Product): Observable<Product>{
    const url = `${this.baseURL}/${product.id}`;
    return this.httpclient.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorconect(e))
      );
  }

  deletarproduto(id: number): Observable<Product>{
    const url = `${this.baseURL}/${id}`;
    return this.httpclient.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorconect(e))
      );
  }

  errorconect(e: any): Observable<any>{
    this.showmessage('Erro na conexão', true);
    return EMPTY;
  }

}
