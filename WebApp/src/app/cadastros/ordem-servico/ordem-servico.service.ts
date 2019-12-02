import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../shared/base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(ordemServico: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI +"OrdemServico/", ordemServico)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(ordemServico: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI +"OrdemServico/"+ordemServico.cdOrdemServico, ordemServico)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI +"OrdemServico/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }
  

  listAll() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"OrdemServico/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI +"OrdemServico/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"OrdemServico/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }
}
