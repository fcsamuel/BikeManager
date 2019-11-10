import { Component, OnInit } from '@angular/core';
import { NotaEntrada } from '../models/notaEntrada';
import { NotaEntradaService } from './nota-entrada.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedorService } from '../cliente-fornecedor/cliente-fornecedor.service';
import { ClienteFornecedor } from '../models/clienteFornecedor';

@Component({
  selector: 'app-nota-entrada',
  templateUrl: './nota-entrada.component.html',
  styleUrls: ['./nota-entrada.component.css']
})
export class NotaEntradaComponent implements OnInit {
  
  notaEntrada: NotaEntrada;
  edit: boolean;
  fornecedorList: Array<ClienteFornecedor> = new Array<ClienteFornecedor>();

  minDate = new Date();

  constructor(private notaEntradaService: NotaEntradaService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public fornecedorService: ClienteFornecedorService) { }

  ngOnInit() {
    this.notaEntrada = new NotaEntrada();
    this.loadFornecedorList();
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
        console.log(this.fornecedorList.length);
      }
    },
    error => {
      this.spinner.hide();
    })
  }

}
