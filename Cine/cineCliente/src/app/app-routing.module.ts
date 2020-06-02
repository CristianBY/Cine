import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { IniciosesionComponent } from './iniciosesion/iniciosesion.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { CierrasesionComponent } from './cierrasesion/cierrasesion.component';
import { PagoComponent } from './pago/pago.component';
import { FotoComponent } from './foto/foto.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'cartelera',
    component: CarteleraComponent
  },
  {
    path: 'tarifas',
    component: TarifasComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'iniciosesion',
    component: IniciosesionComponent
  },
  {
    path: 'cierrasesion',
    component: CierrasesionComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'foto',
    component: FotoComponent
  },
  {
    path: '**',
    component: IndexComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
