import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent implements OnInit {

  ordemServico: OrdemServico;
  edit: boolean;
  clienteList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();
  produtoList: Array<Produto> = new Array<Produto>();
  produtoServicoList: Array<Produto> = new Array<Produto>();
  produto: Produto;
  item: ItemOrdemServico;

  minDate = new Date();
  date = new FormControl(new Date());

  constructor(private ordemServicoService: OrdemServicoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private clienteService: ClienteFornecedorService,
    private produtoService: ProdutoService,
    private formaPagamentoService: FormaPagamentoService) { }

  ngOnInit() {
    this.ordemServico = new OrdemServico();
    this.getLastId();
    this.loadClienteList();
    this.loadProdutoList();
    //this.loadFormaPagamentoList();
    this.produto = new Produto();
    this.item = new ItemOrdemServico();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }

      }
    )
  }
  backwards() {
    this.router.navigate(["../ordem-servico-list"]);
  }

  getLastId() {
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
        this.produtoServicoList.forEach(p => p.fgTipo == 'P' ? this.produtoList.push(p) : null);
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
    console.log(this.produto);
  }

  addItem() {
    this.item.produto = this.produto;
    this.ordemServico.itemList.push()
  }
  /*
    produtoToItem(produto: any) : ItemOrdemServico {
      
    }
  */
}
