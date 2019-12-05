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
import { MatTableDataSource, MatPaginator, MatSort, MatProgressSpinnerModule } from '@angular/material';
import { ContaService } from '../conta/conta.service';
import { ItemOrdemServicoService } from '../item-ordem-servico/item-ordem-servico.service';
import { MatOptionSelectionChange } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent implements OnInit {

  itemColumns: string[] = ['countItem', 'dsProduto', 'qtProduto', 'vlUnitario', 'vlTotal', 'editColumn'];
  servicoColumns: string[] = ['dsProduto', 'qtProduto', 'vlUnitario', 'vlTotal', 'editColumn'];
  pagColumns: string[] = ['nrParcela', 'dtPagamento', 'vlParcela'];

  itemDataSource: any;
  servicoDataSource: any;
  pagamentoDataSource: any;

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
  itemList: Array<ItemOrdemServico> = new Array<ItemOrdemServico>();
  itemServicoList: Array<ItemOrdemServico> = new Array<ItemOrdemServico>();
  estoqueList: Array<Estoque> = new Array<Estoque>();
  estoqueListGeral: Array<Estoque> = new Array<Estoque>();
  pagamentoList: Array<Pagamento> = new Array<Pagamento>();

  produto: Produto;
  servico: Produto;
  item: ItemOrdemServico;
  conta: Conta;
  tbPreco: TabelaPreco;
  estoque: Estoque;
  lastEstoque: Estoque;
  cliente: ClienteFornecedor;
  pagamento: Pagamento;
  dtPagamento: Date;
  dtPag: Date;

  estoqueLastId: number;
  tbPrecoLastId: number;
  pagamentoLastId: number;
  contaLastId: number;

  countItem: number;
  vlTotal: string;

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
    private pagamentoService: PagamentoService,
    private contaService: ContaService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initObjects();
    this.setLastId();
    this.getLastIdEstoque();
    this.getLastIdTbPreco();
    this.getLastIdConta();
    this.getLastIdPagamento();
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
    this.lastEstoque = new Estoque();
    this.itemList = new Array<ItemOrdemServico>();
    this.pagamento = new Pagamento();
    this.dtPagamento = new Date();
    this.pagamentoList = new Array<Pagamento>();
    this.conta.pagamentoList = new Array<Pagamento>();
    this.countItem = 0;
  }

  save() {
    console.log(this.ordemServico);
    this.spinner.show();
    this.concatItemServico();
    console.log(this.ordemServico);
    this.geraParcelas();
    this.ordemServicoService.save(this.ordemServico).subscribe(sucesso => {
      if (sucesso != null) {
        this.spinner.hide();
        this.backwards();
        console.log("O.S salva.");
        this.saveAllEstoque(this.estoqueListGeral);
      }
    }, error => { console.log(error) });
  }

  backwards() {
    this.router.navigate(["../ordemservico-list"]);
  }

  setLastId() {
    this.ordemServicoService.getLastId().subscribe(sucesso => {
      if (sucesso)
        this.ordemServico.cdOrdemServico = sucesso;
    });
  }


  setContaLastId(pagamento: Pagamento) {
    this.contaService.getLastId().subscribe(sucesso => {
      if (sucesso != null) {
        /*this.conta.cdConta = sucesso;
        this.ordemServico.cdConta = sucesso;
        pagamento.cdConta = sucesso;*/
      }
    })
  }

  setConta() {
    this.conta.dsTipo = 'AR';
    this.conta.dtVencimento = new Date();
    this.conta.dtVencimento.setDate(this.conta.dtVencimento.getDate() + 30);
    this.conta.vlPago = 0;
    this.conta.vlTotal = this.ordemServico.vlTotal;
    this.ordemServico.conta = this.conta;
  }

  saveConta() {
    this.contaService.save(this.conta).subscribe(sucesso => {
      if (sucesso != null) {
        console.log("Conta Salva.");
      }
    })
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

  setCliente(cliente: any) {
    this.cliente = cliente;
    this.ordemServico.cdClienteFornecedor = cliente.cdClienteFornecedor;

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

  setProduto(event: any, produto: any) {
    if (event.isUserInput) {
      this.produto = new Produto();
      this.getTbPreco(produto.cdProduto);
      this.getEstoqueOfProduct(produto.cdProduto);
      this.getEstoqueList(produto.cdProduto);
    }
  }

  getTbPreco(id: any) {
    this.tbPrecoService.GetLastTbPrecoByProduct(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.tbPreco = sucesso;
        this.item.vlUnitario = this.tbPreco.vlTotal;
      }
    });
  }

  getLastIdEstoque() {
    this.estoqueService.getLastId().subscribe(sucesso => {
      if (sucesso != null)
        this.estoqueLastId = sucesso;
    });
  }

  getLastIdTbPreco() {
    this.tbPrecoService.getLastId().subscribe(sucesso => {
      if (sucesso != null) {
        this.tbPrecoLastId = sucesso;
      }
    });
  }

  setTbPreco() {
    this.tbPrecoService.getLastId().subscribe(sucesso => {
      if (sucesso != null) {
        this.tbPreco.cdTabelaPreco = sucesso;
      }
    });
    this.tbPreco.cdProduto = this.item.cdProduto;
    this.tbPreco.vlTotal = this.item.vlUnitario;
    let vlUnit = this.item.vlUnitario;
    this.tbPreco.vlTotal = vlUnit.valueOf();
  }

  calculaVlTotal() {
    this.item.vlTotal = (this.item.qtProduto * this.item.vlUnitario);
  }

  setServico(servico: any) {
    this.servico = servico;
    this.item.vlUnitario = servico.vlServico;
  }


  addItem() {
    this.setTbPreco();
    this.setEstoque();
    this.countItem = this.itemList.length;
    this.item.countItem = ++this.countItem;
    this.item.produto = this.produto;
    this.item.cdOrdemServico = this.ordemServico.cdOrdemServico;
    this.item.cdTabelaPreco = this.tbPreco.cdTabelaPreco;
    this.item.cdProduto = this.produto.cdProduto;
    this.itemList.push(this.item);
    this.updateItemTable(this.itemList);
    this.calculaVlTotalOrdem();
    this.cleanItems();
  }

  cleanItems() {
    this.item = new ItemOrdemServico();
    this.produto = new Produto();
    this.estoque = new Estoque();
    this.estoqueList = new Array<Estoque>();
  }

  concatItemServico() {
    this.ordemServico.itemList = this.itemList.concat(this.itemServicoList);
  }

  calculaVlTotalItem() {
    this.vlTotal = (this.item.qtProduto * this.item.vlUnitario).toFixed(2);
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

  getLastIdPagamento() {
    this.pagamentoService.getLastId().subscribe(sucesso => {
      if (sucesso != null)
        this.pagamentoLastId = sucesso;
    });
  }

  getLastIdConta() {
    this.contaService.getLastId().subscribe(sucesso => {
      if (sucesso != null) {
        this.contaLastId = sucesso;
      }
    });
  }

  geraParcelas() {
    this.setConta();
    var vlParcela = this.ordemServico.vlTotal.valueOf() / this.conta.qtParcelas.valueOf();
    var parcela = 1;
    for (let i = 0; i < this.conta.qtParcelas; i++) {
      this.pagamento = new Pagamento();
      this.pagamento.nrParcela = parcela++;
      this.pagamento.cdPagamento = this.pagamentoLastId++;
      this.pagamento.cdConta = this.contaLastId;
      this.pagamento.fgPago = false;
      this.pagamento.dtPagamento = new Date();
      this.pagamento.dtPagamento.setMonth(this.pagamento.dtPagamento.getMonth() + (i + 1));
      this.pagamento.vlParcela = parseFloat(vlParcela.toFixed(2));
      this.conta.pagamentoList.push(this.pagamento);
      this.updatePagamentoTable(this.conta.pagamentoList);
    }
   /* this.updatePagamentoTable(this.pagamentoList);
    console.log(this.pagamentoList);
    this.conta.pagamentoList = this.pagamentoList;*/
  }

  getEstoqueOfProduct(id: any) {
    this.estoqueService.getLastStockOfProduct(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.estoque = sucesso;
      }
    })
  }

  getEstoqueList(id: any) {
    this.estoqueService.findStockByProduct(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.estoqueList = sucesso;
      }
    })
  }

  saveAllEstoque(estoqueList: any) {
    this.estoqueListGeral.forEach(e => this.saveEstoque(e));
  }

  setEstoque() {
    this.estoque.cdEstoque = this.estoqueLastId++;
    this.estoque.cdProduto = this.item.cdProduto;
    this.estoque.cdOrdemServico = this.ordemServico.cdOrdemServico;
    this.estoque.qtProduto = this.item.qtProduto;
    this.estoque.tpLancamento = 'OS';
    this.estoque.vlCusto = this.item.vlCusto;
    this.estoque.vlCustoMedio = this.item.vlCustoMedio;
    let i = this.estoqueList.length;
    if (this.estoqueList[i - 1] != undefined) {
      this.estoque.qtAtual = (this.estoqueList[i - 1].qtAtual.valueOf() - this.estoque.qtProduto.valueOf());
    } else {
      this.estoque.qtAtual = 0 + this.estoque.qtProduto.valueOf();
    }
    this.estoqueListGeral.push(this.estoque);
  }

  saveEstoque(estoque: any) {
    this.estoqueService.save(estoque).subscribe(sucesso => {
      if (sucesso != null) {
        console.log("Estoque salvo");
      }
    }, error => {
      console.log("Erro ao salvar estoque");
    });
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

  updatePagamentoTable(pagamento: any) {
    this.pagamentoDataSource = new MatTableDataSource<Pagamento>(pagamento);
    this.pagamentoDataSource.paginator = this.paginatorCustom;
    this.pagamentoDataSource.sort = this.sortCustom;
  }

  calculaVlTotalOrdem() {
    this.ordemServico.vlTotal += this.item.vlTotal;
  }

}
