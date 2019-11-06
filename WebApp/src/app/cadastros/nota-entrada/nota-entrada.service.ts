import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/catch';
import { BaseService } from '../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class NotaEntradaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(notaEntrada: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "NotaEntrada/", notaEntrada)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(notaEntrada: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "NotaEntrada/" + notaEntrada.cdnotaEntrada, notaEntrada)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI + "NotaEntrada/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    return this.http.get(environment.urlWebAPI + "NotaEntrada/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "NotaEntrada/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }
}
