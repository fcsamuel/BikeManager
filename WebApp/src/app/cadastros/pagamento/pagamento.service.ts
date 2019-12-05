import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(pagamento: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Pagamento/", pagamento)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(pagamento: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Pagamento/" + pagamento.cdPagamento, pagamento)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI + "Pagamento/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    console.log("Passou pelo listAll() - pagamento.service.ts.");
    return this.http.get(environment.urlWebAPI + "Pagamento/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "Pagamento/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Pagamento/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }

  getParcelasByCliente(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Pagamento/GetParcelasByCliente")
      .catch((error: any) => Observable.throw(error.error));
  }
}
