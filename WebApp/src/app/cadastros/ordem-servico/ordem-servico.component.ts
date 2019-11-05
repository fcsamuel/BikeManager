import { Component, OnInit } from '@angular/core';
import { OrdemServico } from '../models/ordemServico';
import { OrdemServicoService } from './ordem-servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { ClienteFornecedorService } from '../cliente-fornecedor/cliente-fornecedor.service';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent implements OnInit {

  ordemServico: OrdemServico;
  edit: boolean;
  clienteList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();

  minDate = new Date();
  date = new FormControl(new Date());

  constructor(private ordemServicoService: OrdemServicoService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public clienteService: ClienteFornecedorService) { }

  ngOnInit() {
    this.ordemServico = new OrdemServico();
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
    this.router.navigate(["../ordem-servico-list"]);
  }

  getById(id: any) {
    this.ordemServicoService.list(id).subscribe( sucesso => {
      if(sucesso != null) {
        this.fill(sucesso);
      }
    }, error => {
      console.log("Ocorreu um erro no método getById(id: any) - ordem-servico.component.ts");
    })
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
        console.log(this.clienteList.length);
      }
    },
    error => {
      this.spinner.hide();
    })
  }

}
