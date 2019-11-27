import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class ItemOrdemServicoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(itemOrdemServico: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "ItemOrdemServico/", itemOrdemServico)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(itemOrdemServico: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "ItemOrdemServico/" + itemOrdemServico.cdProduto + "/" + itemOrdemServico.cdOrdemServico,  itemOrdemServico)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(cdOrdemServico: number, cdProduto: number): Observable<any> {
    return this.http.delete(environment.urlWebAPI + "ItemOrdemServico/" + cdProduto + cdOrdemServico)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "ItemOrdemServico/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "ItemOrdemServico/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getId(): Observable<any> {
    return this.http.get(environment.urlWebAPI + "ItemOrdemServico/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }
}
