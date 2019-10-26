import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/shared/base.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(marca: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI +"Marca/", marca)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(marca: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI +"Marca/"+marca.cdMarca, marca)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI +"Marca/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Marca/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Marca/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }
}