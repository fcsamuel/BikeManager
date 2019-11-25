import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemitemNotaEntradaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(itemNotaEntrada: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "ItemNotaEntrada/", itemNotaEntrada)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(itemNotaEntrada: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "ItemNotaEntrada/" + itemNotaEntrada.cdItemNotaEntrada, itemNotaEntrada)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.urlWebAPI + "ItemNotaEntrada/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "ItemNotaEntrada/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "ItemNotaEntrada/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "ItemNotaEntrada/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }
}
