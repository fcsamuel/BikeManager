import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  callNewOs() {
    this.router.navigate(["../ordemservico"]);
  }

  callOsList() {
    this.router.navigate(["../ordemservico-list"]);
  }

  callNewNotaEntrada() {
    this.router.navigate(["../notaentrada"]);
  }

  callNotaEntradaList() {
    this.router.navigate(["../notaentrada-list"]);
  }

  callNewCliente() {
    this.router.navigate(["../clientefornecedor"]);
  }

  callClienteList() {
    this.router.navigate(["../clientefornecedor-list"]);
  }

  callNewProduto() {
    this.router.navigate(["../produto"]);
  }

  callProdutoList() {
    this.router.navigate(["../produto-list"]);
  }

  callNewServico() {
    this.router.navigate(["../servico"]);
  }

  callServicoList() {
    this.router.navigate(["../servico-list"]);
  }

}
