import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { UsuarioSesion } from '../../servicios/usuarioSesion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  public listaMultimedia = new Array();

  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion, private router:Router) { }

  ngOnInit(): void {
    this.getMultimedia();
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    }
  }

  getMultimedia(){
    this._peticionesServicio.getMultimediaJSON().subscribe(data=>{
      let titulo = sessionStorage.getItem('foto');
      let infoTitulo = data.filter(element => element.titulo == titulo);
      this.listaMultimedia = infoTitulo[0].imagenes;
    });
  }

}
