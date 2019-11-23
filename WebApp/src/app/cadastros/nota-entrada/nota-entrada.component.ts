import { Component, OnInit, ViewChild } from '@angular/core';
import { NotaEntrada } from '../models/notaEntrada';
import { NotaEntradaService } from './nota-entrada.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedorService } from '../cliente-fornecedor/cliente-fornecedor.service';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { FormControl } from '@angular/forms';
import { TabelaPrecoServiceService } from '../tabela-preco/tabela-preco-service.service';
import { ProdutoService } from '../produto/produto.service';
import { Produto } from '../models/produto';
import { ItemNotaEntrada } from '../models/itemNotaEntrada';
import { TabelaPreco } from '../models/tabelaPreco';
import { Estoque } from '../models/estoque';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EstoqueService } from '../estoque/estoque.service';

@Component({
  selector: 'app-nota-entrada',
  templateUrl: './nota-entrada.component.html',
  styleUrls: ['./nota-entrada.component.css']
})
export class NotaEntradaComponent implements OnInit {

  displayedColumns : string[] = ['dsProduto', 'editColumn'];
  itemDataSource: any

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  
  notaEntrada: NotaEntrada;
  edit: boolean;

  fornecedorList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();
  produtoServicoList: Array<Produto> = new Array<Produto>();
  produtoList: Array<Produto> = new Array<Produto>();

  fornecedor = new ClienteFornecedor();
  produto: Produto;
  item: ItemNotaEntrada;
  tbPreco: TabelaPreco;
  estoque: Estoque;

  date = new FormControl(new Date());
  minDate = new Date();
  maxDate = new Date();

  constructor(private notaEntradaService: NotaEntradaService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public fornecedorService: ClienteFornecedorService,
    public tabelaPrecoService: TabelaPrecoServiceService,
    public estoqueService: EstoqueService,
    public produtoService: ProdutoService) { }

  ngOnInit() {
    this.notaEntrada = new NotaEntrada();
    this.produto = new Produto();
    this.item = new ItemNotaEntrada();
    this.tbPreco = new TabelaPreco();
    this.estoque = new Estoque();
    this.loadFornecedorList();
    this.loadProdutoList();
    this.notaEntradaService.getLastId().subscribe(sucesso => {
      if (sucesso)
        this.notaEntrada.cdNotaEntrada = sucesso;
    })
    this.activatedRoute.params.subscribe(
      params =>  {
        if (params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }
      }
    )
  }

  backwards() {
    this.router.navigate(["../nota-entrada-list"]);
  }

  getById(id: any) {
    this.notaEntradaService.list(id).subscribe( sucesso => {
      if(sucesso != null) {
        this.fill(sucesso);
      }
    }, error => {
      console.log("Ocorreu um erro no método getById(id: any) - nota-entrada.component.ts");
    })
  }

  fill(notaEntrada: any) {
    this.notaEntrada = notaEntrada;
  }

  loadFornecedorList() {
    this.spinner.show();
    this.fornecedorService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.fornecedorList = sucesso;
        this.spinner.hide();
      }
    },
    error => {
      this.spinner.hide();
    })
  }

  setFornecedor(fornecedor: any) {
    this.notaEntrada.clienteFornecedor = fornecedor;
    this.notaEntrada.cdClienteFornecedor = fornecedor.cdClienteFornecedor;
  }
  
  setProduto(produto: any) {
    this.item.produto = produto;
    this.item.cdProduto = produto.cdProduto;
    this.estoque.cdProduto = produto.cdProduto;
    console.log(produto.cdProduto);
    this.estoqueService.findStockByProduct(produto.cdProduto).subscribe(sucesso => {
      if (sucesso != undefined) {
        this.item.produto.estoqueList = sucesso;
        console.log(this.item.produto.estoqueList);
      }
    }, error => {
      console.log("Erro no setProduto(produto)");
    })
  }

  loadProdutoList() {
    this.spinner.show();
    this.produtoService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.produtoServicoList = sucesso;
        this.produtoServicoList.forEach(p => p.fgTipo == 'P' ? this.produtoList.push(p) : null);
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  listAllItem() {
    this.updateItemTable(this.notaEntrada.itemList);
  }

  addItem() {
    //this.notaEntrada.itemList.push(this.item);
    console.log(this.item);
    this.setTbPreco();
    this.setEstoque();
  }

  setItem() {
  }


  setTbPreco() {
    this.tbPreco.cdProduto = this.item.cdProduto;
    this.tbPreco.produto = this.item.produto;
    this.tbPreco.vlTotal = this.item.vlTotal;
    console.log(this.tbPreco);
  }

  setEstoque() {
    this.estoque.cdProduto = this.item.cdProduto;
    this.estoque.cdNotaEntrada = this.notaEntrada.cdNotaEntrada;
    this.estoque.notaEntrada = this.notaEntrada;
    this.estoque.qtProduto = this.item.qtProduto;
    this.estoque.tpLancamento = 'NE';
    //this.estoque.vlCustoMedio = this.calculaCustoMedio();
    }

    calculaCustoMedio() {
      var custoTotal = 0.00;
      //console.log(this.produto.estoqueList);
      /*var qtEstoque = this.produto.estoqueList.length;
      this.produto.estoqueList.forEach(e => {custoTotal += e.vlCusto});
      return custoTotal / qtEstoque;*/
    }

    updateItemTable(item: any) {
      this.itemDataSource = new MatTableDataSource<ItemNotaEntrada>(item);
      this.itemDataSource.paginator = this.paginatorCustom;
      this.itemDataSource.sort = this.sortCustom;
    }
    
}
