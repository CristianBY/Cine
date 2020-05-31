import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {

  public datos:Array<any> = [];
  public login:boolean = false;
  public passwordIni?:string;
  public username:string;
  public nologin:string = 'none';
  public invalid:string = 'none';
  public user:Usuario;

  constructor(private _peticionesServicio: PeticionesServicio, private router:Router) { }

  ngOnInit(): void {
  }

  getUsuario(passwordIni,username){ 
    this._peticionesServicio.getUsuariosJSON(passwordIni,username).subscribe(data=>{
      if (data.token != "No") {
        sessionStorage.setItem('token',data.token);
        sessionStorage.setItem('idUsuario',data.idUsuario);
        sessionStorage.setItem('username',data.nombre);
        if (data.role) {
          this.router.navigate(['auth']);
          sessionStorage.setItem('role','true');
        } else {
          sessionStorage.setItem('role','false');
          this.router.navigate(['user']);
        }

      } else {
        this.nologin = 'block';
        this.invalid = 'is-invalid';
      }
    });  
  }

}
