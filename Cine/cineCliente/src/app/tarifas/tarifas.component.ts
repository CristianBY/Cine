import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { UsuarioSesion } from '../../servicios/usuarioSesion';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  public datos:Array<any> = [];

  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion) { }

  ngOnInit(): void {
    this.getTarifas();
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    }
    
  }

  /**
   * Pide todas las tarifas y las carga en una lista 
   */
  getTarifas(){ 
    this._peticionesServicio.getTarifasJSON().subscribe(data=>{
      this.datos = data;
    });  
  }
}
