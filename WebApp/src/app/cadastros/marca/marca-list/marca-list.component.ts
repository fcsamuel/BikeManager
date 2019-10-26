import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { MarcaService } from '../marca.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Marca } from '../../models/marca';
import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {

  displayedColumns: string[] = ["cdMarca", "dsMarca", "editColumn"];
  public dataSource: any;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private marcaService: MarcaService,
    public router: Router, 
    private dialog: MatDialog,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.listAll();
  }

  callUpdate(id: number) {
    this.router.navigate(["../marca-edit/"+id]);
  }

  callNew() {
    this.router.navigate(["../marca"]);
  }

  delete(id: number) {
    this.marcaService.delete(id).subscribe(sucesso => {
      if(sucesso != null) {
        this.listAll();
      }
    },
    error => {
      this.spinner.hide();
    });
  }

  deleteConfirmation(id: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: 'Confirma a exclusão do registro?',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(isConfirm => {
      if(isConfirm) {
        this.delete(id);
      }
    });
  }

  listAll() {
    this.spinner.show();
    this.marcaService.listAll().subscribe(sucesso => {
      if(sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
      }
    },
    error => {
      this.spinner.hide();
    });
  }

  list(id: number) {
    this.spinner.show();
    this.marcaService.list(id).subscribe(sucesso => {
      if(sucesso != null) {
        this.updateTable(sucesso);
        this.spinner.hide();
      }
    },
    error => {
      this.spinner.hide();
    });
  }

  updateTable(marca: any) {
    this.dataSource = new MatTableDataSource<Marca>(marca);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sort;
  }


}
