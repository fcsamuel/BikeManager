import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria;
  edit: boolean;

  constructor(private categoriaService: CategoriaService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.categoria = new Categoria();
      this.activatedRoute.params.subscribe(
        params => {
          if(params.id != undefined) {
            this.getById(params.id);
            this.edit = true;
          }
        }
      )
    }
  
    save() {
      this.spinner.show();
      if(!this.edit) {
        this.categoriaService.save(this.categoria).subscribe( sucesso => {
          if(sucesso != null) {
            this.spinner.hide();
            this.backward();
          }
        },
        error => {
          this.spinner.hide();
        });
      }else {
        this.update();
        this.router.navigate(["../categoria-list"]);
      }
    }
    
    update() {
      this.categoriaService.update(this.categoria).subscribe( sucesso => {
        if(sucesso != null) {
          this.spinner.hide();
          this.backward();
        }
      },
      error => {
        this.spinner.hide();
      });
    }
  
    backward() {
      this.router.navigate(["../categoria-list"]);
    }
  
    getById(id: number) {
      this.categoriaService.list(id).subscribe(sucesso => {
        if(sucesso != null) {
          this.fill(sucesso);
        }
      },
      error => {
        console.log("ERRO");
      });
    }
  
    fill(categoria: any) {
      this.categoria = categoria;
    }

}
