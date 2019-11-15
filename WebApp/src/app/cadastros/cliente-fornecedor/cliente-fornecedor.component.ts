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

  maxDate = new Date();
  tipo: string;

  @ViewChild(MatPaginator, {static: false}) paginatorCustom: MatPaginator;
  @ViewChild(MatSort, {static: false}) sortCustom: MatSort;

  constructor(  private clienteFornecedorService: ClienteFornecedorService,
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
    this.clienteFornecedorService.getId().subscribe(sucesso => {
      if (sucesso)
        this.clienteFornecedor.cdClienteFornecedor = sucesso;
    })
    this.tipoList.push(new Tipo('C', "Cliente"));
    this.tipoList.push(new Tipo('F', "Fornecedor"));
    this.tipoList.push(new Tipo('CF', "Cliente/Fornecedor"));
    this.activatedRoute.params.subscribe(
      params => {
        if(params.id != undefined) {
          this.getByIdClienteFornecedor(params.id);
          this.edit = true;
        }
      }
    );
  }

  save() {
    this.spinner.show();
    console.log(this.clienteFornecedor);
    this.clienteFornecedor.enderecoList.forEach(e => e.municipio = null);
    if(!this.edit) {
      this.clienteFornecedorService.save(this.clienteFornecedor).subscribe(sucesso => {
        if(sucesso != null) {
          this.spinner.hide();
          this.backwards();
          for (let element of this.clienteFornecedor.enderecoList) {
            this.enderecoService.save(element).subscribe(sucesso => {
              if (sucesso != null) {
                this.spinner.hide();
                this.backwards();
              }
            }, error => {
              this.spinner.hide();
              console.log("Erro ao salvar endereço");
              console.log(this.clienteFornecedor);
            });
          }
          for (let element of this.clienteFornecedor.contatoList) {
            this.contatoService.save(element).subscribe(sucesso => {
              if (sucesso != null) {
                this.spinner.hide();
                this.backwards();
              }
            }, error => {
              this.spinner.hide();
              console.log("Erro ao salvar contato");
              console.log(this.clienteFornecedor);
            });
          }
          //this.contatoService.save(this.clienteFornecedor.contatoList);
        }
      },
      error => {
        this.spinner.hide();
      });
    }else {
      this.update();
      //this.backwards();
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
    this.clienteFornecedor.contatoList.push(this.contato);
    this.listAllContatos();
    console.log(this.clienteFornecedor.contatoList);
    
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


}
