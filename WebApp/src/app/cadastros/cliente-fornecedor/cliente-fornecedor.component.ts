import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteFornecedorService } from './cliente-fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteFornecedor } from '../models/clienteFornecedor';
import { Endereco } from '../models/endereco';
import { Contato } from '../models/contato';
import { Tipo } from '../models/tipo';
import { Municipio } from '../models/municipio';
import { MunicipioService } from '../municipio/municipio.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { EnderecoService } from '../endereco/endereco.service';
import { ContatoService } from '../contato/contato.service';

@Component({
  selector: 'app-cliente-fornecedor',
  templateUrl: './cliente-fornecedor.component.html',
  styleUrls: ['./cliente-fornecedor.component.css']
})
export class ClienteFornecedorComponent implements OnInit {

  enderecoColumns: string[] = ["nrCep", "dsRua", "nrNumero", "dsBairro", "dsComplemento", "dsMunicipio", "editColumn"];
  contatoColumns: string[] = ["nmContato", "nrNumero", "dsEmail", "editColumn"];

  public enderecoDataSource: any;
  public contatoDataSource: any;

  clienteFornecedor: ClienteFornecedor;
  endereco: Endereco;
  contato: Contato;

  municipioList: Array<Municipio> = new Array<Municipio>();
  tipoList: Array<Tipo> = new Array<Tipo>();

  edit: boolean;
  editEndereco: boolean;
  editContato: boolean;

  cdEndereco: number;
  cdContato: number;

  maxDate = new Date();
  tipo: string;

  @ViewChild(MatPaginator, { static: false }) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortCustom: MatSort;

  constructor(private clienteFornecedorService: ClienteFornecedorService,
    private enderecoService: EnderecoService,
    private contatoService: ContatoService,
    private municipioService: MunicipioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.clienteFornecedor = new ClienteFornecedor();
    this.endereco = new Endereco();
    this.contato = new Contato();
    this.clienteFornecedor.enderecoList = new Array<Endereco>();
    this.clienteFornecedor.contatoList = new Array<Contato>();
    this.loadMunicipioList();
    this.clienteFornecedorService.getLastId().subscribe(sucesso => {
      if (sucesso)
        this.clienteFornecedor.cdClienteFornecedor = sucesso;
    });
    this.tipoList.push(new Tipo('C', "Cliente"));
    this.tipoList.push(new Tipo('F', "Fornecedor"));
    this.tipoList.push(new Tipo('CF', "Cliente/Fornecedor"));
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id != undefined) {
          this.getById(params.id);
          this.edit = true;
        }
      }
    );
  }
  
  getById(id: any) {
    this.clienteFornecedorService.list(id).subscribe(sucesso => {
      if (sucesso != null) {
        this.fill(sucesso);
        console.log(sucesso);
        this.updateEnderecoTable(sucesso.enderecoList);
        this.updateContatoTable(sucesso.contatoList);
        this.contatoService.getLastId().subscribe(sucesso => {
          if (sucesso)
            this.cdContato = sucesso;
        });
      }
    },
      error => {
        console.log("ERRO");
      });
  }

  save() {
    this.spinner.show();
    console.log(this.clienteFornecedor);
    this.clienteFornecedor.enderecoList.forEach(e => e.municipio = null);
    if (!this.edit) {
      this.clienteFornecedorService.save(this.clienteFornecedor).subscribe(sucesso => {
        if (sucesso != null) {
          this.spinner.hide();
          this.backwards();
        }
      },
        error => {
          this.spinner.hide();
        });
    } else {
      this.update();
      console.log(this.clienteFornecedor);
      this.backwards();
    }
  }

  update() {
    console.log(this.clienteFornecedor);
    this.clienteFornecedorService.update(this.clienteFornecedor).subscribe(sucesso => {
      if (sucesso != null) {
        this.spinner.hide();
        this.backwards();
      }
    },
      error => {
        this.spinner.hide();
      });
    this.updateEnderecos();
    this.updateContatos();
  }

  backwards() {
    this.router.navigate(["../clientefornecedor-list"]);
  }

  getByIdClienteFornecedor(id: number) {
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

  loadMunicipioList() {
    this.spinner.show();
    this.municipioService.listAll().subscribe(sucesso => {
      if (sucesso != null) {
        this.municipioList = sucesso;
        this.spinner.hide();
        console.log(this.municipioList);
      }
    },
      error => {
        this.spinner.hide();
      });
  }

  listAllEnderecos() {
    this.updateEnderecoTable(this.clienteFornecedor.enderecoList);
    this.endereco = new Endereco();
  }

  addEndereco() {
    this.endereco.cdClienteFornecedor = this.clienteFornecedor.cdClienteFornecedor;
    var id = this.clienteFornecedor.enderecoList.length + 1;
    this.endereco.cdEndereco = id;
    this.clienteFornecedor.enderecoList.push(this.endereco);
    this.listAllEnderecos();
  }

  removerEndereco(id: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: 'Deseja realmente excluir o registro?',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(isConfirm => {
      if (isConfirm) {
        var posicao = this.clienteFornecedor.enderecoList.indexOf(id);
        this.clienteFornecedor.enderecoList.splice(posicao, 1);
        this.listAllEnderecos();
      }
    });
  }

  listAllContatos() {
    this.updateContatoTable(this.clienteFornecedor.contatoList);
    this.contato = new Contato();
  }

  addContato() {
    this.contato.cdClienteFornecedor = this.clienteFornecedor.cdClienteFornecedor;
    var id = this.clienteFornecedor.contatoList.length + 1;
    this.contato.cdContato = id;
    this.clienteFornecedor.contatoList.push(this.contato);
    this.listAllContatos();
  }

  removerContato(id: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'custom-dialog',
      data: 'Deseja realmente excluir o registro?',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(isConfirm => {
      if (isConfirm) {
        var posicao = this.clienteFornecedor.contatoList.indexOf(id);
        this.clienteFornecedor.contatoList.splice(posicao, 1);
        this.listAllContatos();
      }
    });
  }

  setMunicipio(municipio: any) {
    this.endereco.cdMunicipio = municipio.cdMunicipio;
    this.endereco.cdEstado = municipio.cdEstado;
    this.endereco.municipio = municipio;
    this.endereco.dsMunicipio = municipio.dsMunicipio;
    this.endereco.dsSigla = municipio.estado.dsSigla;
    console.log(this.endereco);
  }

  updateEnderecoTable(endereco: any) {
    this.enderecoDataSource = new MatTableDataSource<Endereco>(endereco);
    this.enderecoDataSource.paginator = this.paginatorCustom;
    this.enderecoDataSource.sort = this.sortCustom;
  }

  updateContatoTable(contato: any) {
    this.contatoDataSource = new MatTableDataSource<Contato>(contato);
    this.contatoDataSource.paginator = this.paginatorCustom;
    this.contatoDataSource.sort = this.sortCustom;
  }

  updateEnderecos() {
    this.clienteFornecedorService.listAll().subscribe(sucesso => {
      this.clienteFornecedor.enderecoList.forEach(c => c.cdEndereco != sucesso.cdEndereco ? this.enderecoService.save(c).subscribe(sucesso => {
        if (sucesso != null) {
          console.log(sucesso);
        }
      }) : console.log("já cadastrado"));
    });
  }

  updateContatos() {
    this.contatoService.listAll().subscribe(sucesso => {
      this.clienteFornecedor.contatoList.forEach(c => c.cdContato != sucesso.cdContato ? this.contatoService.save(c).subscribe(sucesso => {
        if (sucesso != null) {
          console.log(sucesso);
        }
      }) : console.log("já cadastrado"));
    });
  }

}
