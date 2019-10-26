import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { OrdemServicoComponent } from './cadastros/ordem-servico/ordem-servico.component';


const routes: Routes = [
  {path: 'marca', component: MarcaComponent},
  {path: 'marca-list', component: MarcaListComponent},
  {path: 'marca-edit/:id', component: MarcaComponent},
  {path: 'ordemservico', component: OrdemServicoComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
