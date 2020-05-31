export class Pelicula {
    constructor(
        public _titulo :string,
        public _anyo:string,
        public _pais:string,
        public _genero:string,
        public _calificacion:string,
        public _duracion:string,
        public _estreno:Date,
        public _sinopsis:string
    )
    {}

    
    public get titulo() : string {
        return this._titulo;
    }
    public get anyo() : string {
        return this._anyo;
    }
    public get pais() : string {
        return this._pais;
    }
    public get genero() : string {
        return this._genero;
    }
    public get calificacion() : string {
        return this._calificacion;
    }
    public get duracion() : string {
        return this._duracion;
    }
    public get estreno() : Date {
        return this._estreno;
    }
    public get sinopsis() : string {
        return this._sinopsis;
    }
    
} 