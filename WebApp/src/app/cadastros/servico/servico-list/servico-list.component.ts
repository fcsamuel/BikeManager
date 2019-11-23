import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutoService } from '../../produto/produto.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {

  displayedColumns: string[] = ['cdServico', 'dsServico', 'vlServico', 'editColumn'];
  public dataSource: any;
  produtoServicoList: Array<Produto> = new Array<Produto>();
  servicoList: Array<Produto>;
  

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  constructor(private servicoService: ProdutoService,
    public router: Router,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.servicoList = new Array<Produto>();
    this.listAll();
  }

  callUpdate(id: number) {
    this.router.navigate(["../servico-edit/" + id]);
  }

  callNew() {
    this.router.navigate(["../servico"]);
  }

  delete(id: number) {
    this.servicoService.delete(id).subscribe(sucesso =>  {
      if (sucesso != null) {
        this.listAll();
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método delete(id: number) - servico-list.component.ts");
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
    this.servicoService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.produtoServicoList = sucesso;
        this.produtoServicoList.forEach(ps => ps.fgTipo == 'S' ? this.servicoList.push(ps) : null);
        this.updateTable(this.servicoList);
        this.spinner.hide();
        console.log("Passou pelo listAll() - servico-list.component.ts com sucesso.");
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método listAll().");
    });
  }

  list(id: number) {
    this.spinner.show();
    this.servicoService.list(id).subscribe(sucesso => {
      if(sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método list(id: number) - servico-list.component.ts");
    });
  }

  updateTable(servico: any) {
    this.dataSource = new MatTableDataSource<Produto>(servico);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
    console.log("Passou pelo updateTable(servico: any) - servico-list.component.ts com sucesso.");
  }

}
