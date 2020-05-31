import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from 'src/servicios/peticiones.servicio';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  public multimediaInfo:Array<any> = [];
  public reserva:Array<any> = [];

  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion, private router:Router) { }

  ngOnInit(): void {
    this.getMultimedia();
    this.getReserva();
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    }
  }

  getMultimedia(){
    this._peticionesServicio.getMultimediaJSON().subscribe(data=>{
      this.multimediaInfo = data;
    });
  }

  getReserva() {
    let idProyeccion = sessionStorage.getItem('compra');
    this._peticionesServicio.getReservaJSON(idProyeccion).subscribe(data=>{
      this.reserva = data;
    });
  }

}
