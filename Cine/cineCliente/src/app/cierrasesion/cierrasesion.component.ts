import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';

@Component({
  selector: 'app-cierrasesion',
  templateUrl: './cierrasesion.component.html',
  styleUrls: ['./cierrasesion.component.css']
})
export class CierrasesionComponent implements OnInit {

  constructor(private _usuarioSesion: UsuarioSesion, private router:Router) { }

  ngOnInit(): void {
      this._usuarioSesion.cierraSesion();
    
  }

}
