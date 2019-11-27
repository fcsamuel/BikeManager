import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { OrdemServico } from '../../models/ordemServico';
import { OrdemServicoService } from '../ordem-servico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Conta } from '../../models/conta';
import { ClienteFornecedor } from '../../models/clienteFornecedor';
import { ItemOrdemServicoService } from '../../item-ordem-servico/item-ordem-servico.service';
import { ItemOrdemServico } from '../../models/itemOrdemServico';

@Component({
  selector: 'app-ordem-servico-list',
  templateUrl: './ordem-servico-list.component.html',
  styleUrls: ['./ordem-servico-list.component.css']
})
export class OrdemServicoListComponent implements OnInit {

  displayedColumns: string[] = ['cdOrdemServico', 'dsClienteFornecedor', 'vlTotal', 'dtPrevConclusao', 'dtConclusao'];
  dataSource: any;

  conta: Conta;
  cliente: ClienteFornecedor;
  itemList: Array<ItemOrdemServico>;
  itemListAll: Array<ItemOrdemServico>;


  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  constructor(private router: Router,
  private spinner: NgxSpinnerService,
  private dialog: MatDialog,
  private ordemServicoService: OrdemServicoService) { }

  ngOnInit() {

    this.listAll();
    this.conta = new Conta();
    this.cliente = new ClienteFornecedor();
    this.itemListAll = new Array<ItemOrdemServico>();
    this.itemList = new Array<ItemOrdemServico>();
  }

  listAll() {
    this.spinner.show();
    this.ordemServicoService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
        console.log("Passou pelo listAll() - categoria-list.component.ts com sucesso.");
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método listAll().");
    });
  }

  callUpdate(id: number) {
    this.router.navigate(["../notaentrada-edit/" + id]);
  }

  callNew() {
    this.router.navigate(["../notaentrada"]);
  }

  updateTable(ordemServico: any) {
    this.dataSource = new MatTableDataSource<OrdemServico>(ordemServico);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
  }


}
