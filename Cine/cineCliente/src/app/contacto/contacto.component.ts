import { Component, OnInit } from '@angular/core';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(private _usuarioSesion: UsuarioSesion) { }

  ngOnInit(): void {
    this._usuarioSesion.comprobarSesion();
  }

}
