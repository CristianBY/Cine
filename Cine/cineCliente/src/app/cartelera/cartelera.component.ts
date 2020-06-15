import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from '../../servicios/peticiones.servicio';
import { UsuarioSesion } from '../../servicios/usuarioSesion';
import { Proyeccion } from '../model/Proyeccion';
import { Pelicula } from '../model/Pelicula';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  public cartelera:Array<any> = [];
  public peliculas:Array<any> = [];
  public multimediaInfo:Array<any> = [];
  public valoracion:Array<any> = [];
  public listaDiasSemana:Array<any> = [];
  public token;
  public carteleraSemanal=new Array();

  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion, private router:Router) { }

  ngOnInit(): void {
    this.diasSemana();
    this.getMultimedia();
    this.getValoracion();
    this.getCarteleraDia();
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
      this.token = sessionStorage.getItem('token'); // Para habilitar los botones de las sesiones para un usario registrado
    }

  }
  
  /**
   * Crea una lista con los 7 días de la semana incluyendo hoy
   * @param Sin parámetros
   * @returns
   */
  diasSemana(){
    for (let i = 0; i < 7; i++) {
      let hoy = new Date();
      this.listaDiasSemana.push(hoy.setDate(hoy.getDate()+i));      
    }
  }

  /**
   * Obtiene todas las valoraciones
   * @param Sin parámetros
   * @returns
   */
  getValoracion(){
    this._peticionesServicio.getValoracionJSON().subscribe(data=>{
      this.valoracion = data;
    });
  }

  /**
   * Obtiene la info contenida en el multimedia.json 
   */
  getMultimedia(){
    this._peticionesServicio.getMultimediaJSON().subscribe(data=>{
      this.multimediaInfo = data;
    });
  }

  /**
   * Genera la lista con los datos de la cartelera para cada uno de los 7 días
   */
  getCarteleraDia(){
    let dia = new Date();
    let sesion;
    let sesiones = new Array();
    let carteleraDelDia = new Array();
    let encontrado = false; // Control en el caso de que una película no esté en una sesión el día que se quiere consultar 
    this._peticionesServicio.getPeliculaJSON().subscribe(data=>{
      this.peliculas = data;
      this._peticionesServicio.getCarteleraJSON().subscribe(data2=>{
        this.cartelera = data2;
        for (let i = 0; i < 7; i++) {
          dia = new Date();
          dia.setDate(dia.getDate()+i-1);
          this.peliculas.forEach(element => { 
            this.cartelera.forEach(element2 => {
              
              //let cambio = element2.fecha.setDate(element2.fecha.getDate()-1);
              if (element2.fecha.substr(5,5) == dia.toISOString().substr(5,5) && element.titulo == element2.titulo){
                encontrado = true;
                sesion = new Proyeccion(element2.idProyeccion,element2.fecha,element2.hora,element2.titulo,element2.idSala,element2.idTarifa);
                sesiones.push(sesion);           
              }           
            });  
            if (encontrado){
              let pelicula = new Pelicula(element.titulo,element.anyo,element.pais,element.genero,element.calificacion,element.duracion,element.estreno,element.sinopsis,);
              let peliculaEnCartelera = {
                'pelicula' : pelicula,
                'sesiones' : sesiones
              }
              encontrado = false;
              carteleraDelDia.push(peliculaEnCartelera);
              sesiones = new Array();
            }                  
          });
          let ordenCartelera ={
            'orden' : i,
            'carteleraDelDia' : carteleraDelDia
          }
          this.carteleraSemanal.push(ordenCartelera);         
          carteleraDelDia = new Array();
        }
      });
    });
  }
  
  /**
   * Se encarga de dirigirnos al pago con la sesión que queremos adquirir
   * @param sesion 
   */
  procesoDeCompra(sesion){
    sessionStorage.setItem('compra',sesion);
    this.router.navigate(['pago']);
  }

  /**
   * Nos dirige a una página con las fotos de la película deseada
   * @param titulo 
   */
  foto(titulo){
    sessionStorage.setItem('foto',titulo);
    this.router.navigate(['foto']);
  }

}
