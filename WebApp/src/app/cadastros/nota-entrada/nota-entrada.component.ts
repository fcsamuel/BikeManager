import { Component, OnInit, ViewChild } from '@angular/core';
import { NotaEntrada } from '../models/notaEntrada';
import { NotaEntradaService } from './nota-entrada.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedorService } from '../cliente-fornecedor/cliente-fornecedor.service';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { FormControl } from '@angular/forms';
import { ProdutoService } from '../produto/produto.service';
import { Produto } from '../models/produto';
import { ItemNotaEntrada } from '../models/itemNotaEntrada';
import { TabelaPreco } from '../models/tabelaPreco';
import { Estoque } from '../models/estoque';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EstoqueService } from '../estoque/estoque.service';
import { ContaService } from '../conta/conta.service';
import { Conta } from '../models/conta';
import { FormaPagamentoService } from '../forma-pagamento/forma-pagamento.service';
import { FormaPagamento } from '../models/formaPagamento';
import { Pagamento } from '../models/pagamento';
import { PagamentoService } from '../pagamento/pagamento.service';
import { DatePipe } from '@angular/common';
import { TabelaPrecoService } from '../tabela-preco/tabela-preco.service';
import { ItemitemNotaEntradaService } from '../item-nota-entrada/item-nota-entrada.service';

@Component({
  selector: 'app-nota-entrada',
  templateUrl: './nota-entrada.component.html',
  styleUrls: ['./nota-entrada.component.css']
})
export class NotaEntradaComponent implements OnInit {

  itemColumns: string[] = ["dsProduto", "vlCusto", "qtProduto", "vlTotal", "editColumn"];
  pagamentoColumns: string[] = ["dsFormaPagamento", "vlPago", "dtPagamento", "editColumn"];

  itemDataSource: any;
  pagamentoDataSource: any;

  @ViewChild(MatPaginator, { static: false }) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortCustom: MatSort;


  notaEntrada: NotaEntrada;
  edit: boolean;

  fornecedorList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();
  produtoServicoList: Array<Produto> = new Array<Produto>();
  produtoList: Array<Produto> = new Array<Produto>();
  estoqueList: Array<Estoque> = new Array<Estoque>();
  estoqueListGeral: Array<Estoque> = new Array<Estoque>();
  formaPagamentoList: Array<FormaPagamento> = new Array<FormaPagamento>();
  pagamentoList: Array<Pagamento> = new Array<Pagamento>();
  tbPrecoList: Array<TabelaPreco> = new Array<TabelaPreco>();

  fornecedor = new ClienteFornecedor();
  produto: Produto;
  item: ItemNotaEntrada;
  tbPreco: TabelaPreco;
  estoque: Estoque;
  conta: Conta;
  pagamento: Pagamento;
  formaPagamento: FormaPagamento;
  dsFormaPagamento: string = '';

  custoTotal: number;

  estoqueLastId : number;
  tbPrecoLastId : number;

  date = new FormControl(new Date());
  minDate = new Date();
  maxDate = new Date();

  constructor(private notaEntradaService: NotaEntradaService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public fornecedorService: ClienteFornecedorService,
    public estoqueService: EstoqueService,
    public produtoService: ProdutoService,
    public contaService: ContaService,
    public formaPagamentoService: FormaPagamentoService,
    public pagamentoService: PagamentoService,
    public tbPrecoService: TabelaPrecoService,
    public datePipe: DatePipe,
    public itemService: ItemitemNotaEntradaService) { }

  ngOnInit() {
    this.loadFornecedorList();
    this.loadProdutoList();
    this.loadFormaPagamentoList();
    this.initObjects();
    this.getLastIdEstoque();
    this.getLastIdTbPreco();
    this.notaEntradaService.getLastId().subscribe(sucesso => {
      if (sucesso)
        this.notaEntrada.cdNotaEntrada = sucesso;
    });
    this.setContaLastId();
    this.conta.pagamentoList = new Array<Pagamento>();
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
    this.notaEntrada = new NotaEntrada();
    this.notaEntrada.vlTotal = 0;
    this.produto = new Produto();
    this.item = new ItemNotaEntrada();
    this.tbPreco = new TabelaPreco();
    this.estoque = new Estoque();
    this.item.estoqueList = new Array<Estoque>();
    this.estoqueListGeral = new Array<Estoque>();
    this.notaEntrada.itemList = new Array<ItemNotaEntrada>();
    this.conta = new Conta();
    this.formaPagamento = new FormaPagamento();
    this.pagamento = new Pagamento();
  }

  save() {
    if (!this.edit) {

    }
    this.spinner.show();
    this.setConta();
    this.notaEntrada.clienteFornecedor = null;
    console.log(this.notaEntrada);
    if (!this.edit) {
      try {
        this.notaEntradaService.save(this.notaEntrada).subscribe(sucesso => {
          if (sucesso != null) {
            this.saveAllEstoque(this.estoqueListGeral);
            this.saveAllTbPreco(this.tbPrecoList);
            this.notaEntrada.fgLancada = true;
            this.spinner.hide();
            this.backwards();
            this.notaEntrada.itemList.forEach(i => { this.itemService.save(i).subscribe(sucesso, error => { console.log("Erro ao salvar item") }) });
          }
        },
          error => {
            this.spinner.hide();
            console.log("Erro save() NotaEntrada");
          });
      } catch (e) {
        console.log("Erro ao salvar NotaEntrada")
        console.log(e);
      }
    } else {
      this.update();
      this.backwards();
    }
    console.log(this.notaEntrada.itemList);
  }

  update() {
    console.log(this.notaEntrada);
    this.notaEntradaService.update(this.notaEntrada).subscribe(sucesso => {
      if (sucesso != null) {
        this.spinner.hide();
        this.backwards();
      }
    },
      error => {
        this.spinner.hide();
      });
    this.updateItens();
    this.updateConta();
  }
  updateConta() {
    this.contaService.update(this.conta).subscribe(sucesso => {
      if (sucesso != null) {
        console.log("Conta alterada com sucesso.");
      }
    }, error => {
      console.log("Erro ao alterar conta");
    });
  }

  updateItens() {
    this.notaEntrada.itemList.forEach(i => {
      this.itemService.update(i).subscribe(sucesso => {
        if (sucesso != null) {
          console.log("Item alterado com sucesso");
        }
      });
    });
  }

  backwards() {
    this.router.navigate(["../notaentrada-list"]);
  }

  getById(id: any) {
    this.notaEntradaService.list(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.fill(sucesso);
      }
    }, error => {
      console.log("Ocorreu um erro no método getById(id: any) - nota-entrada.component.ts");
    })
  }

  setContaLastId() {
    this.contaService.getLastId().subscribe(sucesso => {
      if (sucesso != null && sucesso != undefined) {
        this.conta.cdConta = sucesso;
        this.notaEntrada.cdConta = sucesso;
      }
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

  setFornecedor(fornecedor: any) {
    this.notaEntrada.cdClienteFornecedor = fornecedor.cdClienteFornecedor;
  }

  setProduto(produto: any) {
    this.cleanItems();
    this.getEstoque(produto.cdProduto);
    this.item.qtProduto = 1;
    this.item.produto = produto;
    this.item.cdProduto = produto.cdProduto;
    this.estoque.cdProduto = produto.cdProduto;

  }

  getEstoque(id: any) {
    this.estoqueService.findStockByProduct(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.estoqueList = sucesso;
      }
    }, error => {
      console.log("Erro no getEstoque(id)");
    });
  }

  getLastIdEstoque() {
    this.estoqueService.getLastId().subscribe(sucesso => {
      if (sucesso != null)
        this.estoqueLastId = sucesso;
    });
  }

  setEstoque() {
    console.log("CdEstoque:");
    console.log(this.estoqueLastId);
    this.estoque.cdEstoque = this.estoqueLastId++;
    this.estoque.cdProduto = this.item.cdProduto;
    this.estoque.cdNotaEntrada = this.notaEntrada.cdNotaEntrada;
    this.estoque.qtProduto = this.item.qtProduto;
    this.estoque.tpLancamento = 'NE';
    this.estoque.vlCusto = this.item.vlCusto;
    this.estoque.vlCustoMedio = this.item.vlCustoMedio;
    let i = this.estoqueList.length;
    if (this.estoqueList[i - 1] != undefined) {
      this.estoque.qtAtual = (this.estoqueList[i - 1].qtAtual + this.estoque.qtProduto);
    } else {
      this.estoque.qtAtual = 0 + this.estoque.qtProduto;
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

  saveAllEstoque(estoqueList: any) {
    this.estoqueListGeral.forEach(e => this.saveEstoque(e));
  }

  saveAllTbPreco(tbPrecoList: any) {
    this.tbPrecoList.forEach(tb => this.saveTbPreco(tb));
  }

  saveTbPreco(tbPreco: any) {
    this.tbPrecoService.save(tbPreco).subscribe(sucesso => {
      if (sucesso != null) {
        console.log("TabelaPreco Salva");
      }
    }, error => {
      console.log("Erro ao salvar TbPreco");
    });
  }

  getLastIdTbPreco(){
    this.tbPrecoService.getLastId().subscribe(sucesso => {
      if (sucesso != null) {
        this.tbPrecoLastId = sucesso;
      }
    });
  }

  setTbPreco() {
    console.log("CdTabelaPreco:");
    console.log(this.tbPrecoLastId);
    this.tbPreco.cdTabelaPreco = this.tbPrecoLastId++;
    this.tbPreco.cdProduto = this.item.cdProduto;
    this.tbPrecoList.push(this.tbPreco);
  }

  cleanItems() {
    this.item.produto = new Produto();
    this.item.estoqueList = new Array<Estoque>();
    this.estoque = new Estoque();
    this.estoqueList = new Array<Estoque>();
    this.tbPreco = new TabelaPreco();
  }

  addItem() {
    this.setTbPreco();
    this.setEstoque();
    this.item.cdNotaEntrada = this.notaEntrada.cdNotaEntrada;
    this.item.vlUnitario = this.item.vlCusto;
    this.notaEntrada.itemList.push(this.item);
    this.notaEntrada.vlTotal += this.item.vlUnitario;
    this.listAllItems();
  }

  listAllItems() {
    this.updateItemTable(this.notaEntrada.itemList);
    this.item = new ItemNotaEntrada();
  }

  listAllPagamentos() {
    this.updatePagamentoTable(this.pagamentoList);
  }

  /*addPagamento() {
    this.setPagamento();
    this.conta.pagamentoList.push(this.pagamento);
    this.listAllPagamentos();
    this.cleanPagamento();
  }/*

  /*setPagamento() {
    this.formaPagamentoService.list(this.pagamento.cdFormaPagamento).subscribe(sucesso => {
      if (sucesso != null) {
        this.pagamento.formaPagamento = sucesso;
      }
    });
    this.notaEntrada.conta = this.conta;
    this.pagamento.cdConta = this.conta.cdConta;
    this.conta.vlPago += this.pagamento.vlPago;
  }*/

  cleanPagamento() {
    this.pagamento = new Pagamento();
  }

  setConta() {
    this.contaService.getLastId().subscribe(sucesso => {
      if (sucesso != null) {
        this.conta.cdConta = sucesso;
      }
    });
    this.conta.qtParcelas;
    this.conta.dsTipo = 'AP';
    this.conta.dtVencimento = new Date();
    this.conta.dtVencimento.setDate(this.conta.dtVencimento.getDate() + 30);
    this.conta.vlPago = 0;
    this.conta.vlTotal = this.notaEntrada.vlTotal;
    this.notaEntrada.conta = this.conta;
  }

  calculaCustoMedio() {
    this.item.vlTotal = 0.00;
    var qtEstoque = this.item.estoqueList.length;
    this.item.estoqueList.forEach(e => { this.item.vlTotal += e.vlCusto });
    this.item.vlTotal += this.item.vlCusto;
    this.item.vlCustoMedio = (this.item.vlTotal / (qtEstoque + 1));
    this.calculaCustoTotal();
  }

  calculaCustoTotal() {
    this.item.vlTotal = (this.item.qtProduto * this.item.vlCusto);
  }

  calculaPrecoVenda() {
    this.tbPreco.vlTotal = this.item.vlCustoMedio + (this.item.vlCustoMedio * this.tbPreco.nrMargemLucro / 100);
  }

  updateItemTable(item: any) {
    this.itemDataSource = new MatTableDataSource<ItemNotaEntrada>(item);
    this.itemDataSource.paginator = this.paginatorCustom;
    this.itemDataSource.sort = this.sortCustom;
  }

  updatePagamentoTable(pagamento: any) {
    this.pagamentoDataSource = new MatTableDataSource<Pagamento>(pagamento);
    this.pagamentoDataSource.paginator = this.paginatorCustom;
    this.pagamentoDataSource.sort = this.sortCustom;
  }
}
