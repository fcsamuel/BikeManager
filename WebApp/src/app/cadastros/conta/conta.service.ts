import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(conta: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Conta/", conta)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(conta: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Conta/" + conta.cdConta, conta)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI + "Conta/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    console.log("Passou pelo listAll() - conta.service.ts.");
    return this.http.get(environment.urlWebAPI + "Conta/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "Conta/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Conta/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }
}
