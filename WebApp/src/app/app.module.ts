import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatRadioModule, MatButtonModule, MatTableModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatExpansionModule, MatSelectModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatAutocompleteModule, MatSlideToggleModule, MatAccordion } from '@angular/material';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { OrdemServicoComponent } from './cadastros/ordem-servico/ordem-servico.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { CategoriaComponent } from './cadastros/categoria/categoria.component';
import { CategoriaListComponent } from './cadastros/categoria/categoria-list/categoria-list.component';
import { ProdutoComponent } from './cadastros/produto/produto.component';
import { ClienteFornecedorComponent } from './cadastros/cliente-fornecedor/cliente-fornecedor.component';
import { ClienteFornecedorListComponent } from './cadastros/cliente-fornecedor/cliente-fornecedor-list/cliente-fornecedor-list.component';
import { ProdutoListComponent } from './cadastros/produto/produto-list/produto-list.component';
import { NotaEntradaComponent } from './cadastros/nota-entrada/nota-entrada.component';
import { OrcamentoComponent } from './cadastros/orcamento/orcamento.component';
import { BicicletaComponent } from './cadastros/bicicleta/bicicleta.component';
import { ServicoComponent } from './cadastros/servico/servico.component';
import { ServicoListComponent } from './cadastros/servico/servico-list/servico-list.component';
import { BicicletaListComponent } from './cadastros/bicicleta/bicicleta-list/bicicleta-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DialogComponent,
    MarcaComponent,
    MarcaListComponent,
    OrdemServicoComponent,
    DatepickerComponent,
    CategoriaComponent,
    CategoriaListComponent,
    ProdutoComponent,
    ClienteFornecedorComponent,
    ClienteFornecedorListComponent,
    ProdutoListComponent,
    NotaEntradaComponent,
    OrcamentoComponent,
    BicicletaComponent,
    ServicoComponent,
    ServicoListComponent,
    BicicletaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule, 
    MatTableModule, 
    MatIconModule, 
    HttpClientModule,
    MatPaginatorModule, 
    MatSortModule, 
    MatExpansionModule, 
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSlideToggleModule  
  ],
  providers: [
    HttpClient,
    DatePipe,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
