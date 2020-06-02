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

    /**
     * Hace una petición para comprobar que el usuario está registrado
     * @param password 
     * @param username
     * @returns Devuelve si está registrado o no  
     */
    getUsuariosJSON(password,username): Observable<any> {
        let data = {
            'username' : username,
            'password' : password
        };
        return this.http.post(this.url+"/usuarios", data);
    }

    /**
     * Petición de tarifas al servidor
     * @returns Devuelve las tarifas
     */
    getTarifasJSON(): Observable<any> {
        return this.http.get(this.url+"/tarifas");
    }

    /**
     * Petición de la Cartelera al servidor
     * @returns Devuelve la cartelera
     */
    getCarteleraJSON(): Observable<any> {
        return this.http.get(this.url+"/cartelera");
    }

    /**
     * Petición de las películas al servidor
     * @returns Devuelve las películas
     */
    getPeliculaJSON(): Observable<any> {
        return this.http.get(this.url+"/cartelera/pelicula");
    }

    /**
     * Petición de las valoraciones
     * @returns Devuelve las valoraciones por película ya calculada
     */
    getValoracionJSON(): Observable<any> {
        return this.http.get(this.url+"/valoracion");
    }

    /**
     * Petición de las Salas
     * @returns Devuelve las salas
     */
    getSalasJSON(): Observable<any> {
        return this.http.get(this.url+"/sesion/sala");
    }

    /**
     * Envía al servidor los datos para el registro de un usuario nuevo
     * @param nuevoUsuario 
     */
    addUsuarioServer(nuevoUsuario): Observable<any> {
        return this.http.post(this.url+"/usuarios/registro",nuevoUsuario);
    }

    //Peticiones de la parte de Administración
    //Peliculas
    /**
     * Envía información al servidor para añadir una película a la BD
     * @param data 
     */
    addPeliculaServer(data): Observable<any> {
        return this.http.post(this.url+"/cartelera/add",data);
    }

    /**
     * Envía información al servidor para modificar una película de la BD
     * @param data 
     */
    modificaPeliculaServer(data): Observable<any> {
        return this.http.post(this.url+"/cartelera/modifica",data);
    }

    /**
     * Envía información al servidor para borrar una película de la BD
     * @param titulo 
     */
    deletePeliculaServer(titulo): Observable<any>{
        let pelicula = {
            'titulo' : titulo
        };

        return this.http.post(this.url+"/cartelera/delete",pelicula);
    }

    //Sesiones - Proyección

    /**
     * Pide al servidor todas las sesiones
     * @returns devuelve un JSON con las sesiones
     */
    getSesionesJSON():Observable<any>{
        return this.http.get(this.url+"/sesion");
    }

    /**
     * Envía información al servidor para añadir una sesión en la BD
     * @param data 
     */
    addSesionServer(data):Observable<any>{
        return this.http.post(this.url+"/sesion/add",data);
    }

    /**
     * Envía información al servidor para modificar una sesión de la BD
     * @param data 
     */
    modificaSesionServer(data):Observable<any>{
        return this.http.post(this.url+"/sesion/modifica",data);
    }

    /**
     * Envía información al servidor para borrar una sesión de la BD
     * @param borrarSesion 
     */
    deleteSesionServer(borrarSesion):Observable<any>{
        let data = {
            'sesion' : borrarSesion
        };
        return this.http.post(this.url+"/sesion/delete",data);
    }

    // Tarifas

    /**
     * Envía información al servidor para añadir una tarifa en la BD
     * @param data 
     */
    addTarifaServer(data):Observable<any>{
        return this.http.post(this.url+"/tarifas/add",data);
    }

    /**
     * Envía información al servidor para modificar una tarifa de la BD
     * @param data 
     */
    modificaTarifaServer(data):Observable<any>{
        return this.http.post(this.url+"/tarifas/modifica",data);
    }

    /**
     * Envía información al servidor para borrar una tarifa de la BD
     * @param tarifaBorrada 
     */
    deleteTarifaServer(tarifaBorrada):Observable<any>{
        let data = {
            'idTarifa' : tarifaBorrada
        };
        return this.http.post(this.url+"/tarifas/delete",data);
    }

    // Peticiones de la parte de usuario registrado

    /**
     * Petición al servidor de las películas valoradas
     * @param usuario 
     * @returns Devuelve un JSON con las películas valoradas
     */
    getReservasValoradasJSON(usuario):Observable<any>{
        return this.http.get(this.url+"/reserva/valorada/:"+usuario);
    }

    /**
     * Petición al servidor de las películas no valoradas
     * @param usuario 
     * @returns Devuelve un JSON con las películas no valoradas
     */
    getReservasNoValoradasJSON(usuario):Observable<any>{
        return this.http.get(this.url+"/reserva/novalorada/:"+usuario);
    }

    /**
     * Envía al servidor la información necesaria para añadir una valoración en la BD
     * @param data 
     */
    enviaValoracionServer(data):Observable<any>{
        return this.http.post(this.url+"/reserva/valoracion",data);
    }


    // Peticiones al JSON multimedia.json

    /**
     * Obtiene la información contenida en el JSON de la carpeta assets
     * @returns Devueve el JSON con la información
     */
    getMultimediaJSON():Observable<any>{
        return this.http.get(this.urlMultimedia);
    }

    // Parte de pagos y reservas
    /**
     * Pide al servidor la info necesaria para realizar una reserva y generar la página de pago
     * @param idProyeccion 
     * @returns Devuelve un JSON con la información
     */
    getReservaJSON(idProyeccion):Observable<any>{
        let data = {
            'idProyeccion' : idProyeccion
        }
        return this.http.post(this.url+"/reserva",data);
    }

    /**
     * Envía la información necesaria al servidor para almacenar una reserva
     * @param data 
     */
    resevaServer(data):Observable<any>{
        return this.http.post(this.url+"/reserva/reservado",data);
    }
}