import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';
import { Pelicula } from '../model/Pelicula';
import { Proyeccion } from '../model/Proyeccion';
import { Tarifa } from '../model/Tarifa';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public listaSalas:Array<any> = [];

  // Gestión de Películas
  public listaPeliculas:Array<any> = [];
  public pelicula= new Pelicula("","","","","","",new Date(),"");
  public peliculaBorrada:string;
  public peliculaAModificar:string;
  public faddpelicula: FormGroup;
  public fmodpelicula: FormGroup;

  // Gestión de proyecciones
  public listaSesion:Array<any> = [];
  public listaSesionDia:Array<any> = [];
  public listaFechaSesion:Array<any> = [];
  public proyeccion = new Proyeccion("",new Date(),"","","","");
  public fechaSelectSesion:string = "--Selecciona una fecha--";
  public selectSesion:string = "--Selecciona una sesión--";
  public fechaBorrarSesion:string = "--Selecciona una fecha--";
  public borrarSesion:string = "--Selecciona una sesión--";
  public faddsesion: FormGroup;
  public fmodsesion: FormGroup;

  // Gestión de tarifas
  public listaTarifas:Array<any> = [];
  public tarifa = new Tarifa("","","",-1);
  public tarifaBorrada:string;
  public tarifaSeleccionada:string;
  public faddtarifa: FormGroup;
  public fmodtarifa: FormGroup;

  constructor(private _peticionesServicio: PeticionesServicio,private _usuarioSesion: UsuarioSesion, private router:Router) {
    this.faddpelicula = new FormGroup({
      'tituloPeliculaAP': new FormControl(""),
      'anyoPeliculaAP': new FormControl("2021"),
      'paisPeliculaAP': new FormControl(),
      'generoPeliculaAP': new FormControl('Acción'),
      'calificacionPeliculaAP': new FormControl('TP'),
      'duracionPeliculaAP': new FormControl(),
      'estrenoPeliculaAP': new FormControl(),
      'sinopsisPeliculaAP': new FormControl()
    });

    this.fmodpelicula = new FormGroup({
      'tituloPeliculaMP': new FormControl(),
      'anyoPeliculaMP': new FormControl(),
      'paisPeliculaMP': new FormControl(),
      'generoPeliculaMP': new FormControl(),
      'calificacionPeliculaMP': new FormControl(),
      'duracionPeliculaMP': new FormControl(),
      'estrenoPeliculaMP': new FormControl(),
      'sinopsisPeliculaMP': new FormControl()
    });

    this.faddsesion = new FormGroup({
      'fechaSesionAS': new FormControl(),
      'horaSesionAS': new FormControl(),
      'tituloPeliculaAS': new FormControl(),
      'salaSesionAS': new FormControl(),
      'tarifaSesionAS': new FormControl()
    });

    this.fmodsesion = new FormGroup({
      'fechaSesionMS': new FormControl(),
      'horaSesionMS': new FormControl(),
      'tituloPeliculaMS': new FormControl(),
      'salaSesionMS': new FormControl(),
      'tarifaSesionMS': new FormControl()
    });

    this.faddtarifa = new FormGroup({
      'nombreTarifaAT': new FormControl(),
      'descripcionTarifaAT': new FormControl(),
      'precioTarifaAT': new FormControl()
    });

    this.fmodtarifa = new FormGroup({
      'nombreTarifaMT': new FormControl(),
      'descripcionTarifaMT': new FormControl(),
      'precioTarifaMT': new FormControl()
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role')=="true") {
      this.getTodasPeliculas();
      this.getTodasSesiones();
      this.getTodasTarifas();
      this.getTodasSalas();
    } else {
      this.router.navigate(['']);
    }
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    }
  }

  getTodasSalas(){
    this._peticionesServicio.getSalasJSON().subscribe(data=>{
      this.listaSalas = data;
    });
  }

  /**
   *  Obtiene todas las películas
   *  @param sin parámetros
   *  @returns  devuelve una lista con todas las películas
   */
  getTodasPeliculas(){
    this._peticionesServicio.getPeliculaJSON().subscribe(data=>{
      this.listaPeliculas = data;
    });  
  }

  addPelicula(){
    let data ={
      'titulo' : this.faddpelicula.value.tituloPeliculaAP,
      'anyo' : this.faddpelicula.value.anyoPeliculaAP,
      'pais' : this.faddpelicula.value.paisPeliculaAP,
      'genero' : this.faddpelicula.value.generoPeliculaAP,
      'calificacion' : this.faddpelicula.value.calificacionPeliculaAP,
      'duracion' : this.faddpelicula.value.duracionPeliculaAP,
      'estreno' : this.faddpelicula.value.estrenoPeliculaAP,
      'sinopsis' : this.faddpelicula.value.sinopsisPeliculaAP
    }
    this._peticionesServicio.addPeliculaServer(data).subscribe();
    document.getElementById("botonAddPelicula").style.display="none";
    document.getElementById("botonAddPelicula2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

  /**
   *  Borra una película
   *  @param peliculaBorrada
   *  @returns  recarga la página cuando borra la película
   */
  deletePelicula(peliculaBorrada){
    this._peticionesServicio.deletePeliculaServer(peliculaBorrada).subscribe(data=>{});

    document.getElementById("botonBorraPelicula").style.display="none";
    document.getElementById("botonBorraPelicula2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
    
  }
  /**
   * Modifica una película
   * @param sin parámetros
   * @returns recarga la página cuando actualiza la película
   */
  modificaPelicula(){
    if (this.fmodpelicula.value.tituloPeliculaMP == null ) this.fmodpelicula.value.tituloPeliculaMP = this.pelicula.titulo;
    if (this.fmodpelicula.value.anyoPeliculaMP == null ) this.fmodpelicula.value.anyoPeliculaMP = this.pelicula.anyo;
    if (this.fmodpelicula.value.paisPeliculaMP == null ) this.fmodpelicula.value.paisPeliculaMP = this.pelicula.pais;
    if (this.fmodpelicula.value.generoPeliculaMP == null ) this.fmodpelicula.value.generoPeliculaMP = this.pelicula.genero;
    if (this.fmodpelicula.value.calificacionPeliculaMP == null ) this.fmodpelicula.value.calificacionPeliculaMP = this.pelicula.calificacion;
    if (this.fmodpelicula.value.duracionPeliculaMP == null ) this.fmodpelicula.value.duracionPeliculaMP = this.pelicula.duracion;
    if (this.fmodpelicula.value.estrenoPeliculaMP == null ) this.fmodpelicula.value.estrenoPeliculaMP = this.pelicula.estreno;
    if (this.fmodpelicula.value.sinopsisPeliculaMP == null ) this.fmodpelicula.value.sinopsisPeliculaMP = this.pelicula.sinopsis;
    let data ={
      'titulo' : this.peliculaAModificar,
      'tituloNuevo' : this.fmodpelicula.value.tituloPeliculaMP,
      'anyo' : this.fmodpelicula.value.anyoPeliculaMP,
      'pais' : this.fmodpelicula.value.paisPeliculaMP,
      'genero' : this.fmodpelicula.value.generoPeliculaMP,
      'calificacion' : this.fmodpelicula.value.calificacionPeliculaMP,
      'duracion' : this.fmodpelicula.value.duracionPeliculaMP,
      'estreno' : this.fmodpelicula.value.estrenoPeliculaMP,
      'sinopsis' : this.fmodpelicula.value.sinopsisPeliculaMP
    }
    this._peticionesServicio.modificaPeliculaServer(data).subscribe();
    document.getElementById("botonModificaPelicula").style.display="none";
    document.getElementById("botonModificaPelicula2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

  /**
   *  Devuelve un objeto película que se usa paara cargar el formulario de modificación rellenando los datos
   *  @param peliculaAModificar titulo de la pelicula que se desea modificar
   *  @returns  pelicula  Objeto del tipo Pelicula
   */
  selectPelicula(peliculaAModificar){
    this.listaPeliculas.forEach(element => {
      if (element['titulo'] == peliculaAModificar ) {
        this.pelicula = new Pelicula(element['titulo'],element['anyo'],element['pais'],element['genero'],element['calificacion'],element['duracion'],element['estreno'],element['sinopsis']);
        document.getElementById("fmodpelicula").removeAttribute("hidden"); // muestra el formulario una vez a sido seleccionada la película a modificar
      }
    });

  }

  // Sesiones - Proyección
  getTodasSesiones(){
    this._peticionesServicio.getSesionesJSON().subscribe(data=>{
      this.listaSesion = data;
      this.listaSesion.forEach(element => {
        if (!this.listaFechaSesion.includes(element['fecha'])) {
          this.listaFechaSesion.push(element['fecha']);
        }
      });
    });
  }

  muestraSesion(fecha){
    this.listaSesionDia=[]; //Refresco de lista para el cambio del día
    Date.parse(fecha);
    this.listaSesion.forEach(element => {
      if(element['fecha']  == fecha){
        this.listaSesionDia.push(element);
      }
    });

  }

  seleccionaSesion(){ 
    this.listaSesion.forEach(element => {
      if (element['idProyeccion'] == this.selectSesion ) {
        this.proyeccion = new Proyeccion(element['idProyeccion'],element['fecha'],element['hora'],element['titulo'],element['idSala'],element['idTarifa']);
        document.getElementById("fmodsesion").removeAttribute("hidden"); // muestra el formulario una vez a sido seleccionada la sesion a modificar
      }
    });
  } //Selecciona la sesion a modificar

  addSesion(){
    let data ={
      'titulo' : this.faddsesion.value.tituloPeliculaAS,
      'fecha' : this.faddsesion.value.fechaSesionAS,
      'hora' : this.faddsesion.value.horaSesionAS,
      'idSala' : this.faddsesion.value.salaSesionAS,
      'idTarifa' : this.faddsesion.value.tarifaSesionAS
    }
    this._peticionesServicio.addSesionServer(data).subscribe();
    document.getElementById("botonAddSesion").style.display="none";
    document.getElementById("botonAddSesion2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

  modificaSesion(){
    if (this.fmodsesion.value.tituloPeliculaMS == null ) this.fmodsesion.value.tituloPeliculaMS = this.proyeccion.titulo;
    if (this.fmodsesion.value.fechaSesionMS == null ) this.fmodsesion.value.fechaSesionMS = this.proyeccion.fecha;
    if (this.fmodsesion.value.horaSesionMS == null ) this.fmodsesion.value.horaSesionMS = this.proyeccion.hora;
    if (this.fmodsesion.value.salaSesionMS == null ) this.fmodsesion.value.salaSesionMS = this.proyeccion.idSala;
    if (this.fmodsesion.value.tarifaSesionMS == null ) this.fmodsesion.value.tarifaSesionMS = this.proyeccion.idTarifa;
    let data ={
      'idProyeccion' : this.proyeccion.idProyeccion,
      'titulo' : this.fmodsesion.value.tituloPeliculaMS,
      'fecha' : this.fmodsesion.value.fechaSesionMS,
      'hora' : this.fmodsesion.value.horaSesionMS,
      'idSala' : this.fmodsesion.value.idSalaMS,
      'idTarifa' : this.fmodsesion.value.idTarifaMS
    }
    this._peticionesServicio.modificaSesionServer(data).subscribe();
    document.getElementById("botonModificaSesion").style.display="none";
    document.getElementById("botonModificaSesion2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

  deleteSesion(){
    this._peticionesServicio.deleteSesionServer(this.borrarSesion).subscribe();
    document.getElementById("botonBorraSesion").style.display="none";
    document.getElementById("botonBorraSesion2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

  // Tarifas

  getTodasTarifas(){
    this._peticionesServicio.getTarifasJSON().subscribe(data=>{
      this.listaTarifas = data;
    });

  }

  selectTarifa() {
    this.listaTarifas.forEach(element => {
      if (element['idTarifa'] == this.tarifaSeleccionada ) {
        this.tarifa = new Tarifa(element['idTarifa'],element['nombre'],element['descripcion'],element['precio']);
        document.getElementById("fmodtarifa").removeAttribute("hidden"); // muestra el formulario una vez a sido seleccionada la sesion a modificar
      }
    });
  }

  addTarifa(){
    let data ={
      'nombre' : this.faddtarifa.value.nombreTarifaAT,
      'descripcion' : this.faddtarifa.value.descripcionTarifaAT,
      'precio' : this.faddtarifa.value.precioTarifaAT
    }
    this._peticionesServicio.addTarifaServer(data).subscribe();
    document.getElementById("botonAddTarifa").style.display="none";
    document.getElementById("botonAddTarifa2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

  modificaTarifa(){
    if (this.fmodtarifa.value.nombreTarifaMT == null ) this.fmodtarifa.value.nombreTarifaMT = this.tarifa.nombre;
    if (this.fmodtarifa.value.descripcionTarifaMT == null ) this.fmodtarifa.value.descripcionTarifaMT = this.tarifa.descripcion;
    if (this.fmodtarifa.value.precioTarifaMT == null ) this.fmodtarifa.value.precioTarifaMT = this.tarifa.precio;
    let data ={
      'nombre' : this.fmodtarifa.value.nombreTarifaMT,
      'descripcion' : this.fmodtarifa.value.descripcionTarifaMT,
      'precio' : this.fmodtarifa.value.precioTarifaMT,
      'idTarifa' : this.tarifa.idTarifa
    }
    this._peticionesServicio.modificaTarifaServer(data).subscribe();
    document.getElementById("botonModTarifa").style.display="none";
    document.getElementById("botonModTarifa2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }
  
  deleteTarifa(){
    this._peticionesServicio.deleteTarifaServer(this.tarifaBorrada).subscribe();
    document.getElementById("botonBorraTarifa").style.display="none";
    document.getElementById("botonBorraTarifa2").style.display="inline";

    setInterval(() => {
      window.location.reload();
    },2000);
  }

}
