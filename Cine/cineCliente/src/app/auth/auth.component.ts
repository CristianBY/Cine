import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';
import { Pelicula } from '../model/Pelicula';
import { Proyeccion } from '../model/Proyeccion';
import { Tarifa } from '../model/Tarifa';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public listaSalas:Array<any> = [];
  public listaGenero = new Array('Acción','Aventura','Comedia','Fantasía','Drama','Suspense','Infantil','Ciencia ficción','Miedo');
  public listaCalificacion = new Array('TP','+7','+12','+16','+18');

  // Gestión de Películas
  public listaPeliculas:Array<any> = [];
  public pelicula = new Pelicula("","","","","","",new Date(),"");
  public peliculaBorrada:string;
  public peliculaAModificar:string;
  public faddpelicula: FormGroup;
  public fmodpelicula: FormGroup;

  // Gestión de proyecciones
  public listaSesion:Array<any> = [];
  public listaSesionDia:Array<any> = [];
  public listaFechaSesion:Array<any> = [];
  public proyeccion = new Proyeccion("",new Date(),"","","","");
  public fechaSelectSesion:string;
  public selectSesion:string;
  public fechaBorrarSesion:string;
  public borrarSesion:string;
  public faddsesion: FormGroup;
  public fmodsesion: FormGroup;

  // Gestión de tarifas
  public listaTarifas:Array<any> = [];
  public tarifa = new Tarifa("","","",-1);
  public tarifaBorrada:string;
  public tarifaSeleccionada:string;
  public faddtarifa: FormGroup;
  public fmodtarifa: FormGroup;

  constructor(private _peticionesServicio: PeticionesServicio,private _usuarioSesion: UsuarioSesion, private router:Router, private fb: FormBuilder) {
    this.faddpelicula = this.fb.group({
      tituloPeliculaAP: ['',Validators.required],
      anyoPeliculaAP: ['',[Validators.required,Validators.pattern('^19\d\d|20[0-2]\d|2030')]],
      paisPeliculaAP: ['',Validators.required],
      generoPeliculaAP: ['',Validators.required],
      calificacionPeliculaAP: ['',Validators.required],
      duracionPeliculaAP: ['',Validators.required],
      estrenoPeliculaAP: ['',Validators.required],
      sinopsisPeliculaAP: ['',Validators.required]
    });

    this.fmodpelicula = this.fb.group({
      tituloPeliculaMP: ['',Validators.required],
      anyoPeliculaMP: ['',Validators.required],
      paisPeliculaMP: ['',Validators.required],
      generoPeliculaMP: ['',Validators.required],
      calificacionPeliculaMP: ['',Validators.required],
      duracionPeliculaMP: ['',Validators.required],
      estrenoPeliculaMP: ['',Validators.required],
      sinopsisPeliculaMP: ['',Validators.required]
    });

    this.faddsesion = this.fb.group({
      fechaSesionAS: ['',Validators.required],
      horaSesionAS: ['',Validators.required],
      tituloPeliculaAS: ['',Validators.required],
      salaSesionAS: ['',Validators.required],
      tarifaSesionAS: ['',Validators.required]
    });

    this.fmodsesion = this.fb.group({
      fechaSesionMS: ['',Validators.required],
      horaSesionMS: ['',Validators.required],
      tituloPeliculaMS: ['',Validators.required],
      salaSesionMS: ['',Validators.required],
      tarifaSesionMS: ['',Validators.required]
    });

    this.faddtarifa = this.fb.group({
      nombreTarifaAT: ['',Validators.required],
      descripcionTarifaAT: ['',Validators.required],
      precioTarifaAT: ['',Validators.required]
    });

    this.fmodtarifa = this.fb.group({
      nombreTarifaMT: ['',Validators.required],
      descripcionTarifaMT: ['',Validators.required],
      precioTarifaMT: ['',Validators.required]
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
    if (this.faddpelicula.invalid) {
      if(this.faddpelicula.get('tituloPeliculaAP').hasError('required')){
        document.getElementById('tituloPeliculaAP').classList.add('is-invalid');
      }
      if(this.faddpelicula.get('anyoPeliculaAP').hasError('required') || this.faddpelicula.get('anyoPeliculaAP').hasError('pattern')){
        document.getElementById('anyoPeliculaAP').classList.add('is-invalid');
        if (this.faddpelicula.get('anyoPeliculaAP').hasError('pattern')) {
          document.getElementById('anyoPeliculaAP').nextSibling.textContent='Año no válido';
        }
      }
      if(this.faddpelicula.get('paisPeliculaAP').hasError('required')){
        document.getElementById('paisPeliculaAP').classList.add('is-invalid');
      }
      if(this.faddpelicula.get('generoPeliculaAP').hasError('required')){
        document.getElementById('generoPeliculaAP').classList.add('is-invalid');
      }
      if(this.faddpelicula.get('calificacionPeliculaAP').hasError('required')){
        document.getElementById('calificacionPeliculaAP').classList.add('is-invalid');
      }
      if(this.faddpelicula.get('duracionPeliculaAP').hasError('required')){
        document.getElementById('duracionPeliculaAP').classList.add('is-invalid');
      }
      if(this.faddpelicula.get('estrenoPeliculaAP').hasError('required')){
        document.getElementById('estrenoPeliculaAP').classList.add('is-invalid');
      }
      if(this.faddpelicula.get('sinopsisPeliculaAP').hasError('required')){
        document.getElementById('sinopsisPeliculaAP').classList.add('is-invalid');
      }
    }else {  
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

      this.refrescar("botonAddPelicula","botonAddPelicula2");
    }  
  }

  /**
   *  Borra una película
   *  @param peliculaBorrada
   *  @returns  recarga la página cuando borra la película
   */
  deletePelicula(peliculaBorrada){
    this._peticionesServicio.deletePeliculaServer(peliculaBorrada).subscribe(data=>{});

    this.refrescar("botonBorraPelicula","botonBorraPelicula2");
  }
  /**
   * Modifica una película
   * @param sin parámetros
   * @returns recarga la página cuando actualiza la película
   */
  modificaPelicula(){

    if (this.fmodpelicula.invalid) {
      if(this.fmodpelicula.get('tituloPeliculaMP').hasError('required')){
        this.fmodpelicula.value.tituloPeliculaMP = this.pelicula.titulo;
      }
      if(this.fmodpelicula.get('anyoPeliculaMP').hasError('required') || this.fmodpelicula.get('anyoPeliculaMP').hasError('pattern')){
        this.fmodpelicula.value.anyoPeliculaMP = this.pelicula.anyo;
        if (this.fmodpelicula.get('anyoPeliculaMP').hasError('pattern')) {
          document.getElementById('anyoPeliculaMP').classList.add('is-invalid');
        }
      }
      if(this.fmodpelicula.get('paisPeliculaMP').hasError('required')){
        this.fmodpelicula.value.paisPeliculaMP = this.pelicula.pais;
      }
      if(this.fmodpelicula.get('generoPeliculaMP').hasError('required')){
        this.fmodpelicula.value.generoPeliculaMP = this.pelicula.genero;
      }
      if(this.fmodpelicula.get('calificacionPeliculaMP').hasError('required')){
        this.fmodpelicula.value.calificacionPeliculaMP = this.pelicula.calificacion;
      }
      if(this.fmodpelicula.get('duracionPeliculaMP').hasError('required')){
        this.fmodpelicula.value.duracionPeliculaMP = this.pelicula.duracion;
      }
      if(this.fmodpelicula.get('estrenoPeliculaMP').hasError('required')){
        this.fmodpelicula.value.estrenoPeliculaMP = this.pelicula.estreno;
      }
      if(this.fmodpelicula.get('sinopsisPeliculaMP').hasError('required')){
        this.fmodpelicula.value.sinopsisPeliculaMP = this.pelicula.sinopsis;
      }
    }
    if (!this.fmodpelicula.get('anyoPeliculaMP').hasError('pattern')) {
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

      this.refrescar("botonModificaPelicula","botonModificaPelicula2");
    }

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
    if (this.faddsesion.invalid) {
      if(this.faddsesion.get('tituloPeliculaAS').hasError('required')){
        document.getElementById('tituloPeliculaAS').classList.add('is-invalid');
      }
      if(this.faddsesion.get('fechaSesionAS').hasError('required')){
        document.getElementById('fechaSesionAS').classList.add('is-invalid');
      }
      if(this.faddsesion.get('horaSesionAS').hasError('required')){
        document.getElementById('horaSesionAS').classList.add('is-invalid');
      }
      if(this.faddsesion.get('salaSesionAS').hasError('required')){
        document.getElementById('salaSesionAS').classList.add('is-invalid');
      }
      if(this.faddsesion.get('tarifaSesionAS').hasError('required')){
        document.getElementById('tarifaSesionAS').classList.add('is-invalid');
      }

    }else {
      let data ={
        'titulo' : this.faddsesion.value.tituloPeliculaAS,
        'fecha' : this.faddsesion.value.fechaSesionAS,
        'hora' : this.faddsesion.value.horaSesionAS,
        'idSala' : this.faddsesion.value.salaSesionAS,
        'idTarifa' : this.faddsesion.value.tarifaSesionAS
      }
      this._peticionesServicio.addSesionServer(data).subscribe();

      this.refrescar("botonAddSesion","botonAddSesion2");
    }
  }

  modificaSesion(){
    if (this.faddsesion.invalid) {
      if(this.faddsesion.get('tituloPeliculaMS').hasError('required')){
        this.fmodpelicula.value.tituloPeliculaMS = this.proyeccion.titulo;
      }
      if(this.faddsesion.get('fechaSesionMS').hasError('required')){
        this.fmodpelicula.value.fechaSesionMS = this.proyeccion.fecha;
      }
      if(this.faddsesion.get('horaSesionMS').hasError('required')){
        this.fmodpelicula.value.horaSesionMS = this.proyeccion.hora;
      }
      if(this.faddsesion.get('salaSesionMS').hasError('required')){
        this.fmodpelicula.value.salaSesionMS = this.proyeccion.idSala;
      }
      if(this.faddsesion.get('tarifaSesionMS').hasError('required')){
        this.fmodpelicula.value.tarifaSesionMS = this.proyeccion.idTarifa;
      }

    }
    let data ={
      'idProyeccion' : this.proyeccion.idProyeccion,
      'titulo' : this.fmodsesion.value.tituloPeliculaMS,
      'fecha' : this.fmodsesion.value.fechaSesionMS,
      'hora' : this.fmodsesion.value.horaSesionMS,
      'idSala' : this.fmodsesion.value.idSalaMS,
      'idTarifa' : this.fmodsesion.value.idTarifaMS
    }
    this._peticionesServicio.modificaSesionServer(data).subscribe();

    this.refrescar("botonModificaSesion","botonModificaSesion2");

  }

  deleteSesion(){
    this._peticionesServicio.deleteSesionServer(this.borrarSesion).subscribe();

    this.refrescar("botonBorraSesion","botonBorraSesion2");
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
    if (this.faddtarifa.invalid) {
      if(this.faddtarifa.get('nombreTarifaAT').hasError('required')){
        document.getElementById('nombreTarifaAT').classList.add('is-invalid');
      }
      if(this.faddtarifa.get('descripcionTarifaAT').hasError('required')){
        document.getElementById('descripcionTarifaAT').classList.add('is-invalid');
      }
      if(this.faddtarifa.get('precioTarifaAT').hasError('required')){
        document.getElementById('precioTarifaAT').classList.add('is-invalid');
      }
      
    }else {
      let data ={
        'nombre' : this.faddtarifa.value.nombreTarifaAT,
        'descripcion' : this.faddtarifa.value.descripcionTarifaAT,
        'precio' : this.faddtarifa.value.precioTarifaAT
      }
      this._peticionesServicio.addTarifaServer(data).subscribe();

      this.refrescar("botonAddTarifa","botonAddTarifa2");
    }
  }

  modificaTarifa(){
    if (this.faddtarifa.invalid) {
      if(this.faddtarifa.get('nombreTarifaAT').hasError('required')){
        this.fmodtarifa.value.nombreTarifaMT = this.tarifa.nombre;
      }
      if(this.faddtarifa.get('descripcionTarifaAT').hasError('required')){
        this.fmodtarifa.value.descripcionTarifaMT = this.tarifa.descripcion;
      }
      if(this.faddtarifa.get('precioTarifaAT').hasError('required')){
        this.fmodtarifa.value.precioTarifaMT = this.tarifa.precio;
      }    
    }
    let data ={
      'nombre' : this.fmodtarifa.value.nombreTarifaMT,
      'descripcion' : this.fmodtarifa.value.descripcionTarifaMT,
      'precio' : this.fmodtarifa.value.precioTarifaMT,
      'idTarifa' : this.tarifa.idTarifa
    }
    this._peticionesServicio.modificaTarifaServer(data).subscribe();

    this.refrescar("botonModTarifa","botonModTarifa2");

  }
  
  deleteTarifa(){
    this._peticionesServicio.deleteTarifaServer(this.tarifaBorrada).subscribe();
    
    this.refrescar("botonBorraTarifa","botonBorraTarifa2");
  }

  refrescar(boton,boton2){
    document.getElementById(boton).style.display="none";
    document.getElementById(boton2).style.display="inline";
    setInterval(() => {
      window.location.reload();
    },2000);
  }
}
