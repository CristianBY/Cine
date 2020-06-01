import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { UsuarioSesion } from '../../servicios/usuarioSesion';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public currentRate:number = 5;
  public idUsuario:string = sessionStorage.getItem("idUsuario");
  public listaReservasValoradas:Array<any> = []; 
  public listaReservasNoValoradas:Array<any> = [];
  public listaPeliculasNoValoradas:Array<any> = [];
  public multimediaInfo:Array<any> = [];

  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion, private router:Router) { 

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this.getReservasValoradas();
      this.getReservasNoValoradas();
      this.getMultimedia();
      this._usuarioSesion.comprobarSesion();
    } else {
      this.router.navigate(['']);
    }
  }


  getMultimedia(){
    this._peticionesServicio.getMultimediaJSON().subscribe(data=>{
      this.multimediaInfo = data;
    });
  }

  getReservasValoradas(){
    this._peticionesServicio.getReservasValoradasJSON(this.idUsuario).subscribe(data=>{
      this.listaReservasValoradas = data;
    });
  }

  getReservasNoValoradas(){
    this._peticionesServicio.getReservasNoValoradasJSON(this.idUsuario).subscribe(data=>{
      this.listaReservasNoValoradas = data;
    });
    
    
  }

  enviaValoracion(titulo){
    let data = {
      'titulo' : titulo,
      'valoracion' : this.currentRate,
      'idUsuario' : this.idUsuario
    }
    this._peticionesServicio.enviaValoracionServer(data).subscribe(data=>{});
    this.router.navigate(['']);
  }
  

}
