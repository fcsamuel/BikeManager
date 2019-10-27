import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  displayedColumns: string[] = ['cdCategoria', 'dsCategoria', 'editColumn'];
  public dataSource: any;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  constructor(private categoriaService: CategoriaService,
    public router: Router,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.listAll();
  }

  callUpdate(id: number) {
    this.router.navigate(["../categoria-edit/" + id]);
  }

  callNew() {
    this.router.navigate(["../categoria"]);
  }

  delete(id: number) {
    this.categoriaService.delete(id).subscribe(sucesso =>  {
      if (sucesso != null) {
        this.listAll();
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método delete(id: number) - categoria-list.component.ts");
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
    this.categoriaService.listAll().subscribe(sucesso => {
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

  list(id: number) {
    this.spinner.show();
    this.categoriaService.list(id).subscribe(sucesso => {
      if(sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método list(id: number) - categoria-list.component.ts");
    });
  }

  updateTable(categoria: any) {
    this.dataSource = new MatTableDataSource<Categoria>(categoria);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
    console.log("Passou pelo updateTable(categoria: any) - categoria-list.component.ts com sucesso.");
  }

}
