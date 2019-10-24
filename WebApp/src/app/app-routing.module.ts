import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';


const routes: Routes = [
  {path: 'marca', component: MarcaComponent},
  {path: 'marca-list', component: MarcaListComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
