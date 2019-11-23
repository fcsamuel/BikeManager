import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findStockByProduct(id: number) : Observable<any> {
    return this.http.get(environment.urlWebAPI + "Estoque/findStockByProduct")
    .catch((error: any) => Observable.throw(error.error));
  }
}
