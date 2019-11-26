import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(tabelaPreco: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "TabelaPreco/", tabelaPreco)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(tabelaPreco: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "TabelaPreco/" + tabelaPreco.cdTabelaPreco, tabelaPreco)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.urlWebAPI + "TabelaPreco/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "TabelaPreco/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "TabelaPreco/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "TabelaPreco/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }

  findTbPrecoByProduct(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "TabelaPreco/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  GetLastTbPrecoByProduct(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "TabelaPreco/GetLastTbPrecoByProduct/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }
}
