import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedorService } from '../cliente-fornecedor.service';
import { Router } from '@angular/router';
import { ClienteFornecedor } from '../../models/clienteFornecedor';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { CategoriaService } from '../../categoria/categoria.service';
import { ContatoService } from '../../contato/contato.service';
import { EnderecoService } from '../../endereco/endereco.service';
import { Endereco } from '../../models/endereco';
import { Contato } from '../../models/contato';
import { ExcelService } from '../../../shared/excel/excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-fornecedor-list',
  templateUrl: './cliente-fornecedor-list.component.html',
  styleUrls: ['./cliente-fornecedor-list.component.css']
})
export class ClienteFornecedorListComponent implements OnInit {

  dataSource: any;

  displayedColumns: string[] = ['cdClienteFornecedor', 'nrCpfCnpj', 'dsNomeRazao', 'dsFantasia', 'editColumn'];

  clienteFornecedor: ClienteFornecedor;
  contatoList: Array<Contato>;
  enderecoList: Array<Endereco>;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  constructor(private spinner: NgxSpinnerService,
    private clienteFornecedorService: ClienteFornecedorService,
    private contatoService: ContatoService,
    private enderecoService: EnderecoService,
    private dialog: MatDialog,
    private router: Router,
    private excelService: ExcelService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.listAll();
    this.contatoList = new Array<Contato>();
    this.enderecoList = new Array<Endereco>();
    this.clienteFornecedor = new ClienteFornecedor();
  }

  callUpdate(id: number) {
    this.router.navigate(["../clientefornecedor-edit/" + id]);
  }

  callNew() {
    this.router.navigate(["../clientefornecedor"]);
  }

  delete(id: number) {
    this.clienteFornecedorService.list(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.clienteFornecedor = sucesso;
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método delete(id: number) - cliente-fornecedor-list.component.ts");
    });
    console.log(this.clienteFornecedor);
    for (let contato of this.clienteFornecedor.contatoList) {
      this.contatoService.delete(contato.cdContato);
    }
    for (let endereco of this.clienteFornecedor.enderecoList) {
      this.enderecoService.delete(endereco.cdEndereco);
    }
    this.clienteFornecedorService.delete(id).subscribe(sucesso =>  {
      if (sucesso != null) {
        this.listAll();
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método delete(id: number) - cliente-fornecedor-list.component.ts");
    });
  }

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
  }

  listAll() {
    this.spinner.show();
    this.clienteFornecedorService.listAll().subscribe(sucesso => {
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

  updateTable(clienteFornecedor: any) {
    this.dataSource = new MatTableDataSource<ClienteFornecedor>(clienteFornecedor);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
    console.log("Passou pelo updateTable(categoria: any) - categoria-list.component.ts com sucesso.");
  }

  getContato(){

  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataSource.data.map(value => {
      return {
        Emissão: this.datePipe.transform(value.dtEmissao,"dd/MM/yyyy"),
        Número: value.nrNota != null ? value.nrNota: '',
        Cliente: value.clienteFornecedor != null ? value.clienteFornecedor.dsNomeRazao : '',
        Valor: value.vlTotal != null ? value.vlTotal: '',
        Registro: this.datePipe.transform(value.dtRegistro,"dd/MM/yyyy")     
      }
    }), 'cliente_fornecedor_');   
  }

}
