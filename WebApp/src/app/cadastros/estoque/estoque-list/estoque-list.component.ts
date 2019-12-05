import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Estoque } from '../../models/estoque';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../shared/excel/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { EstoqueService } from '../estoque.service';
import { ProdutoService } from '../../produto/produto.service';

@Component({
  selector: 'app-estoque-list',
  templateUrl: './estoque-list.component.html',
  styleUrls: ['./estoque-list.component.css']
})
export class EstoqueListComponent implements OnInit {

  displayedColumns: string[] = ['dsProduto', 'dtRegistro', 'tpLancamento', 'qtProduto', 'qtAtual'];
  dataSource: any;
  excelSource: any;

  produtoList: Array<Produto>;
  produto: Produto;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;
  

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private estoqueService: EstoqueService,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produto = new Produto();
    this.produtoList = new Array<Produto>();
    this.listAllProdutoList();
  }

  listAllProdutoList() {
    this.spinner.show();
    this.produtoService.getOnlyProduto().subscribe(sucesso => {
      if (sucesso != null) {
        this.produtoList = sucesso;
        this.spinner.hide();
        console.log("Passou pelo listAll() - categoria-list.component.ts com sucesso.");
      }
    }, error => {
      this.spinner.hide();
      console.log("Erro no método listAll().");
    });
  }

  getEstoque() {
    this.spinner.show();
    console.log(this.produto);
    this.estoqueService.findStockByProduct(this.produto.cdProduto).subscribe(sucesso => {
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

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataSource.data.map(value => {
      return {
        CdEstoque: value.cdEstoque != null ? value.cdEstoque: '',
        Produto: value.produto.dsProduto  != null ? value.produto.dsProduto: '',
        Origem: value.tpLancamento != null ? value.tpLancamento: '',
        QuantidadeAlterada: value.qtProduto != null ? value.qtProduto : '',
        QuantidadeAtual: value.qtAtual != null ? value.qtAtual: '',
        DataAlteração: this.datePipe.transform(value.dtRegistro,"dd/MM/yyyy")
      }
    }), 'estoque_');
  }

  updateTable(estoque: any) {
    this.dataSource = new MatTableDataSource<Estoque>(estoque);
    this.dataSource.paginator = this.paginatorCustom;
    this.dataSource.sort = this.sortCustom;
  }

}
