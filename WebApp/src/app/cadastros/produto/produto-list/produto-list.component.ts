import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../../models/produto';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { MarcaService } from '../../marca/marca.service';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  displayedColumns: string[] = ["cdProduto", "dsProduto", "dsModelo", "dsMarca", "dsCategoria", "dsInfAdicionais", "dtRegistro", "editColumn"];
  public dataSource: any;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  produto: Produto;
  marca: Marca;
  edit: boolean;

  constructor(private produtoService: ProdutoService,
    private marcaService: MarcaService,
    public router: Router,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.listAll();
  }

  callUpdate(id: number) {
    this.router.navigate(["../produto-edit" + id]);
  }

  callNew() {
    this.router.navigate(["../produto"]);
  }

  delete(id: number) {
    this.produtoService.delete(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.listAll();
      }
    },
    error => {
      this.spinner.hide();
      console.log("Erro no método delete(id: number) - produto-list.component.ts");
    })
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
    this.produtoService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
      }
    },
    error => {
      this.spinner.hide();
      console.log("Erro no método list(id: number) - produto-list.component.ts");
    });
  }

  list(id: number) {
    this.spinner.show();
    this.produtoService.list(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
      }
    },
    error => {
      this.spinner.hide();
      console.log("Erro no método list(id: number) - produto-list.component.ts");
    });
  }

  updateTable(produto: any) {
    this.dataSource = new MatTableDataSource<Produto>(produto);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
  }
}
