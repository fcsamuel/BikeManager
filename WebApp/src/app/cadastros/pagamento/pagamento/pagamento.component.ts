import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../pagamento.service';
import { Pagamento } from '../../models/pagamento';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  pagamentoList: Array<Pagamento>;


  constructor(private pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.pagamentoList = new Array<Pagamento>();
  }

  getParcelas(cdClienteFornecedor: any) {
    this.pagamentoService.getParcelasByCliente(cdClienteFornecedor).subscribe(sucesso => {
      if (sucesso != null) {
        this.pagamentoList = sucesso;
        console.log(this.pagamentoList);
      }
    })
  }



}
