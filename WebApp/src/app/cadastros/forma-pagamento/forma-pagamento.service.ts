import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(formaPagamento: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "FormaPagamento/", formaPagamento)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(formaPagamento: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "FormaPagamento/" + formaPagamento.cdFormaPagamento, formaPagamento)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.urlWebAPI + "FormaPagamento/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "FormaPagamento/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "FormaPagamento/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "FormaPagamento/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }
}
