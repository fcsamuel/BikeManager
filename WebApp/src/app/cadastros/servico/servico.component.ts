import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  servico: Produto;
  edit: boolean;

  constructor(private produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.servico = new Produto();
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
      console.log(this.servico);
      this.servico.fgTipo = 'S';
      this.spinner.show();
      if(!this.edit) {
        this.produtoService.save(this.servico).subscribe(sucesso => {
          if(sucesso != null) {
            this.spinner.hide();
            this.backwards();
          }
        },
        error => {
          this.spinner.hide();
          console.log("Erro ao salvar o servico");
        });
      }else {
        this.update();
        this.router.navigate(["../servico-list"]);
      }
    }
    
    update() {
      this.produtoService.update(this.servico).subscribe(sucesso => {
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
      this.router.navigate(["../servico-list"]);
    }
  
    getById(id: number) {
      this.produtoService.list(id).subscribe(sucesso => {
        if(sucesso != null) {
          this.fill(sucesso);
        }
      },
      error => {
        console.log("ERRO");
      });
    } 
  
    fill(servico: any) {
      this.servico = servico;
    }
}
