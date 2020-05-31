export class Proyeccion {
    constructor(
        public _idProyeccion :string,
        public _fecha:Date,
        public _hora:string,
        public _titulo:string,
        public _idSala:string,
        public _idTarifa:string
    )
    {}

    
    public get idProyeccion() : string {
        return this._idProyeccion;
    }
    public get fecha() : Date {
        return this._fecha;
    }
    public get hora() : string {
        return this._hora;
    }
    public get titulo() : string {
        return this._titulo;
    }
    public get idSala() : string {
        return this._idSala;
    }
    public get idTarifa() : string {
        return this._idTarifa;
    }
    
} 