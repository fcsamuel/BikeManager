import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base.service';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(municipio: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI +"Municipio/", municipio)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(municipio: any) : Observable<any>{
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI +"Municipio/"+municipio.cdMunicipio, municipio)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id : number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI +"Municipio/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Municipio/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Municipio/"+ id)
      .catch((error: any) => Observable.throw(error.error));
  }
}
