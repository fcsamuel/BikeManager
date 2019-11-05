import { Component, OnInit } from '@angular/core';
import { ClienteFornecedorService } from './cliente-fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { Endereco } from '../models/endereco';
import { Contato } from '../models/contato';
import { Tipo } from '../models/tipo';

@Component({
  selector: 'app-cliente-fornecedor',
  templateUrl: './cliente-fornecedor.component.html',
  styleUrls: ['./cliente-fornecedor.component.css']
})
export class ClienteFornecedorComponent implements OnInit {

  displayedColumns: string[] = ["cdClienteFornecedor", "nrCpfCnpj", "dsNomeRazao", "dsFantasia" /*,"dsContato"*/];
  public dataSource: any;
  clienteFornecedor: ClienteFornecedor;
  enderecoList: Array<Endereco> = new Array<Endereco>();;
  contatoList: Array<Contato> = new Array<Contato>();
  tipoList: Array<Tipo> = new Array<Tipo>();
  edit: boolean;
  maxDate = new Date();
  tipo: string;

  constructor(private clienteFornecedorService: ClienteFornecedorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.clienteFornecedor = new ClienteFornecedor();
    this.tipoList.push(new Tipo('C', "Cliente"));
    this.tipoList.push(new Tipo('F', "Fornecedor"));
    this.tipoList.push(new Tipo('CF', "Cliente/Fornecedor"));
    this.activatedRoute.params.subscribe(
      params => {
        if(params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }
      }
    );
  }

  save() {
    this.spinner.show();
    if(!this.edit) {
      this.clienteFornecedorService.save(this.clienteFornecedor).subscribe(sucesso => {
        if(sucesso != null) {
          this.spinner.hide();
          this.backwards();
        }
      },
      error => {
        this.spinner.hide();
      });
    }else {
      this.update();
      this.router.navigate(["../cliente-list"]);
    }
  }
  
  update() {
    this.clienteFornecedorService.update(this.clienteFornecedor).subscribe(sucesso => {
      if(sucesso != null) {
        this.spinner.hide();
        this.backwards();
      }
    },
    error => {
      this.spinner.hide();
    });
  }

  backwards() {
    this.router.navigate(["../cliente-list"]);
  }

  getById(id: any) {
    this.clienteFornecedorService.list(id).subscribe(sucesso => {
      if (sucesso != null) {
          this.fill(sucesso);
      }
    }, 
    error => {
      this.spinner.hide();
    }); 
  }

  fill(clienteFornecedor: any) {
    this.clienteFornecedor = clienteFornecedor;
  }
  
  /*getTipo(tipo: string) {
	if (tipo == "Cliente") {
		this.produto.tipo = "C";
	} else if (tipo == "Fornecedor") {
		this.produto.tipo = "F";
	} else {
		this.produto.tipo = "CF";
	}
  }*/
}
