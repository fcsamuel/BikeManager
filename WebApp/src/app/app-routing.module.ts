import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { OrdemServicoComponent } from './cadastros/ordem-servico/ordem-servico.component';
import { CategoriaComponent } from './cadastros/categoria/categoria.component';
import { CategoriaListComponent } from './cadastros/categoria/categoria-list/categoria-list.component';
import { ProdutoComponent } from './cadastros/produto/produto.component';


const routes: Routes = [
  {path: 'marca', component: MarcaComponent},
  {path: 'marca-list', component: MarcaListComponent},
  {path: 'marca-edit/:id', component: MarcaListComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'categoria-list', component: CategoriaListComponent},
  {path: 'categoria-edit/:id', component: CategoriaComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'ordemservico', component: OrdemServicoComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
