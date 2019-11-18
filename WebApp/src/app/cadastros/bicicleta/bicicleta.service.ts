import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class BicicletaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(bicicleta: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Bicicleta/", bicicleta)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(bicicleta: any): Observable<any> {
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Bicicleta/" + bicicleta.cdBicicleta, bicicleta)
      .catch((error: any) => Observable.throw(error.error));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.urlWebAPI + "Bicicleta/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  listAll(): Observable<any> {
    console.log("Passou pelo listAll() - bicicleta.service.ts.");
    return this.http.get(environment.urlWebAPI + "Bicicleta/")
      .catch((error: any) => Observable.throw(error.error));
  }

  list(id: number): Observable<any> {
    return this.http.get(environment.urlWebAPI + "Bicicleta/" + id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getLastId() : Observable<any> {
    return this.http.get(environment.urlWebAPI +"Bicicleta/GetLastId")
      .catch((error: any) => Observable.throw(error.error));
  }
}
