import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/base.service';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(estoque: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI +"Estoque/", estoque)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(estoque: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI +"Estoque/"+estoque.cdEstoque, estoque)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI +"Estoque/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Estoque/")
      .catch((error: any) => Observable.throw(error.error));
  }

  findStockByProduct(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "Estoque/FindStockByProduct/" + id)
    .catch((error: any) => Observable.throw(error.error));
  }

  getLastId() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Estoque/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastStockOfProduct(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Estoque/GetLastStockOfProduct/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }
}
