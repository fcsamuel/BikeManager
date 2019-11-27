import { Component, OnInit, ViewChild } from '@angular/core';
import { NotaEntrada } from '../../models/notaEntrada';
import { Router } from '@angular/router';
import { Conta } from '../../models/conta';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ClienteFornecedor } from '../../models/clienteFornecedor';
import { ItemNotaEntrada } from '../../models/itemNotaEntrada';
import { NotaEntradaService } from '../nota-entrada.service';
import { ClienteFornecedorService } from '../../cliente-fornecedor/cliente-fornecedor.service';

@Component({
  selector: 'app-nota-entrada-list',
  templateUrl: './nota-entrada-list.component.html',
  styleUrls: ['./nota-entrada-list.component.css']
})
export class NotaEntradaListComponent implements OnInit {

  displayedColumns: string[] = ['nrNota', 'dsClienteFornecedor', 'nrChaveAcesso', 'vlTotal', 'editColumn'];
  dataSource: any;

  conta: Conta;
  fornecedor: ClienteFornecedor;
  itemList: Array<ItemNotaEntrada>;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;
  

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private notaEntradaService: NotaEntradaService,
    private fornecedorService: ClienteFornecedorService) { }

  ngOnInit() {
    this.listAll();
    this.conta = new Conta();
    this.fornecedor = new ClienteFornecedor();
    this.itemList = new Array<ItemNotaEntrada>();
  }

  listAll() {
    this.spinner.show();
    this.notaEntradaService.listAll().subscribe(sucesso => {
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
/*
  deleteConfirmation(id: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: 'Deseja realmente excluir o registro?',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(isConfirm => {
      if (isConfirm) {
        this.delete(id);
      }
    });
  }*/


  updateTable(notaEntrada: any) {
    this.dataSource = new MatTableDataSource<NotaEntrada>(notaEntrada);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
  }



}
