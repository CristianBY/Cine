import { Component, OnInit } from '@angular/core';
import { UsuarioSesion } from '../../servicios/usuarioSesion';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  constructor(private _usuarioSesion: UsuarioSesion) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    }
  }

}
