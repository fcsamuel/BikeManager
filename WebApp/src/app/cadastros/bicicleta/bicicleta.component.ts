import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { Bicicleta } from '../models/bicicleta';
import { Marca } from '../models/marca';
import { Categoria } from '../models/categoria';
import { ProdutoService } from '../produto/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { BicicletaService } from './bicicleta.service';

@Component({
  selector: 'app-bicicleta',
  templateUrl: './bicicleta.component.html',
  styleUrls: ['./bicicleta.component.css']
})
export class BicicletaComponent implements OnInit {

  produto: Produto;
  bicicleta: Bicicleta;
  edit: boolean;
  marcaList: Array<Marca> = new Array<Marca>();
  categoriaList: Array<Categoria> = new Array<Categoria>();

  constructor(private bicicletaService: BicicletaService,
    private produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public spinner: NgxSpinnerService,
    public marcaService: MarcaService,
    public categoriaService: CategoriaService) { }

  ngOnInit() {
    this.produto = new Produto();
    this.bicicleta = new Bicicleta();
    this.loadMarcaList();
    this.loadCategoriaList();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }
      }
    );
  }

  getById(id: number) {
    this.bicicletaService.list(id).subscribe(sucesso => {
      if(sucesso != null) {
        this.fill(sucesso);
      }
    },
    error => {
      console.log("ERRO");
    });
  } 

  fill(bicicleta: any) {
    this.bicicleta = bicicleta;
  }

  save() {
    console.log(this.produto);
    this.produto.fgTipo = 'B';
    this.produto.fgBicicleta = true;
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
        console.log("Erro ao salvar o produto");
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
