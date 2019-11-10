import { Component, OnInit } from '@angular/core';
import { Orcamento } from '../models/orcamento';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { FormControl } from '@angular/forms';
import { OrcamentoServiceService } from './orcamento-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedorService } from '../cliente-fornecedor/cliente-fornecedor.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  orcamento: Orcamento;
  edit: boolean;
  clienteList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();

  minDate = new Date();
  date = new FormControl(new Date());

  constructor(private orcamentoService: OrcamentoServiceService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public clienteService: ClienteFornecedorService) { }

  ngOnInit() {
    this.orcamento = new Orcamento();
    this.loadClienteList();
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
    this.router.navigate(["../orcamento-list"]);
  }

  getById(id: any) {
    this.orcamentoService.list(id).subscribe( sucesso => {
      if(sucesso != null) {
        this.fill(sucesso);
      }
    }, error => {
      console.log("Ocorreu um erro no método getById(id: any) - orcamento.component.ts");
    })
  }

  fill(orcamento: any) {
    this.orcamento = orcamento;
  }

  loadClienteList() {
    this.spinner.show();
    this.clienteService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.clienteList = sucesso;
        this.spinner.hide();  
        console.log(this.clienteList.length);
      }
    },
    error => {
      this.spinner.hide();
    });
  }

}
