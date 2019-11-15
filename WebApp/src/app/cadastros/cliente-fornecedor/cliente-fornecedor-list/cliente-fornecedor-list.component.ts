import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-fornecedor-list',
  templateUrl: './cliente-fornecedor-list.component.html',
  styleUrls: ['./cliente-fornecedor-list.component.css']
})
export class ClienteFornecedorListComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['cdClienteFornecedor', 'nrCpfCnpj', 'dsNomeRazao', 'dsFantasia', 'editColumn'];

  constructor() { }

  ngOnInit() {
  }

}
