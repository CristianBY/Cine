import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class PeticionesServicio {

    public url:string;
    public urlMultimedia:string;

    constructor(private http: HttpClient) { 
        this.url = "http://localhost:9000";
        this.urlMultimedia = "./assets/multimedia.json";

    }

    getUsuariosJSON(password,username): Observable<any> {
        let data = {
            'username' : username,
            'password' : password
        };
        return this.http.post(this.url+"/usuarios", data);
    }

    getTarifasJSON(): Observable<any> {
        return this.http.get(this.url+"/tarifas");
    }

    getCarteleraJSON(): Observable<any> {
        return this.http.get(this.url+"/cartelera");
    }

    getPeliculaJSON(): Observable<any> {
        return this.http.get(this.url+"/cartelera/pelicula");
    }

    getValoracionJSON(): Observable<any> {
        return this.http.get(this.url+"/valoracion");
    }

    getSalasJSON(): Observable<any> {
        return this.http.get(this.url+"/sesion/sala");
    }

    //Peticiones de la parte de Administración
    //Peliculas
    addPeliculaServer(data): Observable<any> {
        return this.http.post(this.url+"/cartelera/add",data);
    }

    modificaPeliculaServer(data): Observable<any> {
        return this.http.post(this.url+"/cartelera/modifica",data);
    }

    deletePeliculaServer(titulo): Observable<any>{
        let pelicula = {
            'titulo' : titulo
        };

        return this.http.post(this.url+"/cartelera/delete",pelicula);
    }

    //Sesiones - Proyección

    getSesionesJSON():Observable<any>{
        return this.http.get(this.url+"/sesion");
    }

    addSesionServer(data):Observable<any>{
        return this.http.post(this.url+"/sesion/add",data);
    }

    modificaSesionServer(data):Observable<any>{
        return this.http.post(this.url+"/sesion/modifica",data);
    }

    deleteSesionServer(borrarSesion):Observable<any>{
        let data = {
            'sesion' : borrarSesion
        };
        return this.http.post(this.url+"/sesion/delete",data);
    }

    // Tarifas

    addTarifaServer(data):Observable<any>{
        return this.http.post(this.url+"/tarifas/add",data);
    }

    modificaTarifaServer(data):Observable<any>{
        return this.http.post(this.url+"/tarifas/modifica",data);
    }

    deleteTarifaServer(tarifaBorrada):Observable<any>{
        let data = {
            'idTarifa' : tarifaBorrada
        };
        return this.http.post(this.url+"/tarifas/delete",data);
    }

    // Peticiones de la parte de usuario registrado

    getReservasValoradasJSON(usuario):Observable<any>{
        return this.http.get(this.url+"/reserva/valorada/:"+usuario);
    }

    getReservasNoValoradasJSON(usuario):Observable<any>{
        return this.http.get(this.url+"/reserva/novalorada/:"+usuario);
    }

    enviaValoracionServer(data):Observable<any>{
        return this.http.post(this.url+"/reserva/valoracion",data);
    }


    // Peticiones al JSON multimedia.json

    getMultimediaJSON():Observable<any>{
        return this.http.get(this.urlMultimedia);
    }

    // Parte de pagos y reservas
    getReservaJSON(idProyeccion):Observable<any>{
        let data = {
            'idProyeccion' : idProyeccion
        }
        return this.http.post(this.url+"/reserva",data);
    }
}