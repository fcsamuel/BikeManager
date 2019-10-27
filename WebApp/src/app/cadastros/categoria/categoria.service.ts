import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService {  

  constructor(private http: HttpClient) {
    super();
  }

  save(categoria: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Categoria/", categoria)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(categoria: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Categoria/" + categoria.cdCategoria, categoria)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI + "Categoria/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    console.log("Passou pelo listAll() - categoria.service.ts.");
    return this.http.get(environment.urlWebAPI + "Categoria/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "Categoria/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }
}
