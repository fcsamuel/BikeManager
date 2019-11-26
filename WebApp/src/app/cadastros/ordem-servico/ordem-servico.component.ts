import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemServico } from '../models/ordemServico';
import { OrdemServicoService } from './ordem-servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { ClienteFornecedorService } from '../cliente-fornecedor/cliente-fornecedor.service';
import { ProdutoService } from '../produto/produto.service';
import { Produto } from '../models/produto';
import { ItemOrdemServico } from '../models/itemOrdemServico';
import { FormaPagamentoService } from '../forma-pagamento/forma-pagamento.service';
import { EstoqueService } from '../estoque/estoque.service';
import { Estoque } from '../models/estoque';
import { TabelaPreco } from '../models/tabelaPreco';
import { TabelaPrecoService } from '../tabela-preco/tabela-preco.service';
import { FormaPagamento } from '../models/formaPagamento';
import { Conta } from '../models/conta';
import { NotaEntrada } from '../models/notaEntrada';
import { Pagamento } from '../models/pagamento';
import { PagamentoService } from '../pagamento/pagamento.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent implements OnInit {

  itemColumns: string[] = ['countItem', 'dsProduto', 'vlUnitario', 'vlTotal', 'editColumn'];
  servicoColumns: string[] = ['dsProduto', 'vlUnitario', 'vlTotal', 'editColumn'];

  itemDataSource: any;
  servicoDataSource: any;

  @ViewChild(MatPaginator, { static: false }) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortCustom: MatSort;

  ordemServico: OrdemServico;
  edit: boolean;
  clienteList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();
  produtoList: Array<Produto> = new Array<Produto>();
  servicoList: Array<Produto> = new Array<Produto>();
  produtoServicoList: Array<Produto> = new Array<Produto>();
  tbPrecoList: Array<TabelaPreco> = new Array<TabelaPreco>();
  formaPagamentoList: Array<FormaPagamento>;
  itemServicoList: Array<ItemOrdemServico> = new Array<ItemOrdemServico>();

  produto: Produto;
  servico: Produto;
  item: ItemOrdemServico;
  conta: Conta;
  notaEntrada: NotaEntrada;
  tbPreco: TabelaPreco;
  estoque: Estoque;

  countItem: number;

  minDate = new Date();
  date = new FormControl(new Date());

  constructor(private ordemServicoService: OrdemServicoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private clienteService: ClienteFornecedorService,
    private produtoService: ProdutoService,
    private formaPagamentoService: FormaPagamentoService,
    private estoqueService: EstoqueService,
    private tbPrecoService: TabelaPrecoService,
    private pagamentoService: PagamentoService) { }

  ngOnInit() {
    this.initObjects();
    this.setLastId();
    this.loadClienteList();
    this.loadProdutoList();
    this.loadFormaPagamentoList();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }

      }
    )
  }

  initObjects() {
    this.ordemServico = new OrdemServico();
    this.ordemServico.vlTotal = 0;
    this.item = new ItemOrdemServico();
    this.produto = new Produto();
    this.servico = new Produto();
    this.conta = new Conta();
    this.tbPreco = new TabelaPreco();
    this.estoque = new Estoque();
    this.ordemServico.itemList = new Array<ItemOrdemServico>();
    this.countItem = 0;
  }

  backwards() {
    this.router.navigate(["../ordem-servico-list"]);
  }

  setLastId() {
    this.ordemServicoService.getLastId().subscribe(sucesso => {
      if (sucesso)
        this.ordemServico.cdOrdemServico = sucesso;
    });
  }

  getById(id: any) {
    this.ordemServicoService.list(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.fill(sucesso);
      }
    }, error => {
      console.log("Ocorreu um erro no método getById(id: any) - ordem-servico.component.ts");
    });
  }

  fill(ordemServico: any) {
    this.ordemServico = ordemServico;
  }

  loadClienteList() {
    this.spinner.show();
    this.clienteService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.clienteList = sucesso;
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
      });
  }

  loadProdutoList() {
    this.spinner.show();
    this.produtoService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.produtoServicoList = sucesso;
        this.produtoServicoList.forEach(p => p.fgTipo == 'P' ? this.produtoList.push(p) : this.servicoList.push(p));
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  loadFormaPagamentoList() {
    this.spinner.show();
    this.formaPagamentoService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.formaPagamentoList = sucesso;
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  setProduto(produto: any) {
    this.produto = produto;
    this.getTbPreco(produto.cdProduto);
    this.getEstoque(produto.cdProduto);
  }

  getTbPreco(id: any) {
    this.tbPrecoService.GetLastTbPrecoByProduct(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.tbPreco = sucesso;
        this.item.vlUnitario = this.tbPreco.vlVenda;
      }
    });
  }

  getEstoque(id: any) {
    this.estoqueService.getLastStockOfProduct(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.estoque = sucesso;
      }
    })
  }

  calculaVlTotal() {
    this.item.vlTotal = (this.item.qtProduto * this.item.vlUnitario);
  }

  setServico(servico: any) {
    this.servico = servico;
    this.item.vlUnitario = servico.vlServico;
  }


  addItem() {
    this.countItem = this.ordemServico.itemList.length;
    this.item.countItem = ++this.countItem;
    this.item.produto = this.produto;
    this.item.cdOrdemServico = this.ordemServico.cdOrdemServico;
    this.item.cdTabelaPreco = this.tbPreco.cdTabelaPreco;
    this.ordemServico.itemList.push(this.item);
    this.updateItemTable(this.ordemServico.itemList);
    console.log(this.item);
    this.calculaVlTotalOrdem();
    this.item = new ItemOrdemServico();
  }

  removeItem() {
    
  }

  calculaVlTotalItem() {
    this.item.vlTotal = (this.item.qtProduto * this.item.vlUnitario);
  }

  addServico() {
    this.item.cdProduto = this.servico.cdProduto;
    this.item.produto = this.servico;
    this.item.cdOrdemServico = this.ordemServico.cdOrdemServico;
    this.itemServicoList.push(this.item);
    this.updateServicoTable(this.itemServicoList);
    this.calculaVlTotalOrdem();
    console.log(this.item);
    this.item = new ItemOrdemServico();
  }

  geraPagamentos() {
    let pagamento = new Pagamento();
    this.pagamentoService.getLastId().subscribe(sucesso => {
      if (sucesso != null)
        pagamento.cdPagamento = sucesso;
    });
    for (let i = 0; i < this.conta.qtParcelas; i++) {
      pagamento.cdConta = this.conta.cdConta;
      this.conta.pagamentoList.push(pagamento);
    }
  }

  updateItemTable(item: any) {
    this.itemDataSource = new MatTableDataSource<ItemOrdemServico>(item);
    this.itemDataSource.paginator = this.paginatorCustom;
    this.itemDataSource.sort = this.sortCustom;
  }

  updateServicoTable(servico: any) {
    this.servicoDataSource = new MatTableDataSource<ItemOrdemServico>(servico);
    this.servicoDataSource.paginator = this.paginatorCustom;
    this.servicoDataSource.sort = this.sortCustom;
  }

  calculaVlTotalOrdem() {
    this.ordemServico.vlTotal += this.item.vlTotal;
  }

}
