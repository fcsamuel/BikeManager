import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatRadioModule, MatButtonModule, MatTableModule, MatIconModule,
  MatPaginatorModule, MatSortModule, MatExpansionModule, MatSelectModule, MatDialogModule, MatDatepickerModule } from '@angular/material';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { OrdemServicoComponent } from './cadastros/ordem-servico/ordem-servico.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DialogComponent,
    MarcaComponent,
    MarcaListComponent,
    OrdemServicoComponent,
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
    MatDatepickerModule
    
  ],
  providers: [HttpClient, DatePipe],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
