import { Component, OnInit } from '@angular/core';
import { OrdemServico } from '../models/ordemServico';
import { OrdemServicoService } from './ordem-servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.css']
})
export class OrdemServicoComponent implements OnInit {

  ordemServico: OrdemServico;
  edit: boolean;

  minDate = new Date();
  date = new FormControl(new Date());

  constructor(private ordemServicoService: OrdemServicoService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.ordemServico = new OrdemServico();
    this.activatedRoute.params.subscribe(
      params =>  {
        if (params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }
      }
    )
  }

  getById(id: any) {
    this.ordemServicoService.list(id).subscribe( sucesso => {
      if(sucesso != null) {
        this.fill(sucesso);
      }
    }, error => {
      console.log("Erro - getById");
    })
  }
  fill(ordemServico: any) {
    this.ordemServico = ordemServico;
  }

}
