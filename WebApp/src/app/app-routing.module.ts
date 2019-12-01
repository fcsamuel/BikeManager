import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { OrdemServicoComponent } from './cadastros/ordem-servico/ordem-servico.component';
import { CategoriaComponent } from './cadastros/categoria/categoria.component';
import { CategoriaListComponent } from './cadastros/categoria/categoria-list/categoria-list.component';
import { ProdutoComponent } from './cadastros/produto/produto.component';
import { ProdutoListComponent } from './cadastros/produto/produto-list/produto-list.component';
import { ClienteFornecedorComponent } from './cadastros/cliente-fornecedor/cliente-fornecedor.component';
import { OrcamentoComponent } from './cadastros/orcamento/orcamento.component';
import { ServicoComponent } from './cadastros/servico/servico.component';
import { ServicoListComponent } from './cadastros/servico/servico-list/servico-list.component';
import { NotaEntradaComponent } from './cadastros/nota-entrada/nota-entrada.component';
import { ClienteFornecedorListComponent } from './cadastros/cliente-fornecedor/cliente-fornecedor-list/cliente-fornecedor-list.component';
import { BicicletaComponent } from './cadastros/bicicleta/bicicleta.component';
import { NotaEntradaListComponent } from './cadastros/nota-entrada/nota-entrada-list/nota-entrada-list.component';
import { OrdemServicoListComponent } from './cadastros/ordem-servico/ordem-servico-list/ordem-servico-list.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';


const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'marca', component: MarcaComponent},
  {path: 'marca-list', component: MarcaListComponent},
  {path: 'marca-edit/:id', component: MarcaComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'categoria-list', component: CategoriaListComponent},
  {path: 'categoria-edit/:id', component: CategoriaComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'produto-list', component: ProdutoListComponent},
  {path: 'clientefornecedor', component: ClienteFornecedorComponent},
  {path: 'clientefornecedor-list', component: ClienteFornecedorListComponent},
  {path: 'clientefornecedor-edit/:id', component: ClienteFornecedorComponent},
  {path: 'ordemservico', component: OrdemServicoComponent},
  {path: 'ordemservico-list', component: OrdemServicoListComponent},
  {path: 'orcamento', component: OrcamentoComponent},
  {path: 'servico', component: ServicoComponent},
  {path: 'servico-list', component: ServicoListComponent},
  {path: 'servico-edit/:id', component: ServicoComponent},
  {path: 'notaentrada', component: NotaEntradaComponent},
  {path: 'notaentrada-list', component: NotaEntradaListComponent},
  {path: 'bicicleta', component: BicicletaComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
