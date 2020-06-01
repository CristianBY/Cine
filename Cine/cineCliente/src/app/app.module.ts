import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import localeEs  from '@angular/common/locales/es';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { RegistroComponent } from './registro/registro.component';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { IndexComponent } from './index/index.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingModule } from 'ng-starrating';
import { registerLocaleData } from '@angular/common';
import { CierrasesionComponent } from './cierrasesion/cierrasesion.component';
import { PagoComponent } from './pago/pago.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CarteleraComponent,
    TarifasComponent,
    RegistroComponent,
    IniciosesionComponent,
    IndexComponent,
    ContactoComponent,
    AuthComponent,
    UserComponent,
    CierrasesionComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RatingModule,
    ShowHidePasswordModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
