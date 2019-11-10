import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(endereco: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Endereco/", endereco)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(endereco: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Endereco/" + endereco.cdEndereco, endereco)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI + "Endereco/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    console.log("Passou pelo listAll() - endereco.service.ts.");
    return this.http.get(environment.urlWebAPI + "Endereco/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "Endereco/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }
  
}
