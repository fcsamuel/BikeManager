import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Marca } from '../models/marca';
import { MarcaService } from '../marca/marca.service';
import { Categoria } from '../models/categoria';
import { CategoriaService } from '../categoria/categoria.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto;
  edit: boolean;
  marcaList: Array<Marca> = new Array<Marca>();
  categoriaList: Array<Categoria> = new Array<Categoria>();

  constructor(private produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public marcaService: MarcaService,
    public categoriaService: CategoriaService) { }

    ngOnInit() {
      this.loadMarcaList();
      this.loadCategoriaList();
      this.produto = new Produto();
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
        this.produtoService.save(this.produto).subscribe(sucesso => {
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
        this.router.navigate(["../produto-list"]);
      }
    }
    
    update() {
      this.produtoService.update(this.produto).subscribe(sucesso => {
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
      this.router.navigate(["../produto-list"]);
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
  
    fill(produto: any) {
      this.produto = produto;
    }

    loadMarcaList() {
      this.spinner.show();
      this.marcaService.listAll().subscribe(sucesso => {
        if (sucesso != null) {
          this.marcaList = sucesso;
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
      })
    }

    loadCategoriaList() {
      this.spinner.show();
      this.categoriaService.listAll().subscribe(sucesso => {
        if (sucesso != null) {
          this.categoriaList = sucesso;
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
      })
    }
}
