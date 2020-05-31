export class Tarifa {
    constructor(
        public _idTarifa :string,
        public _nombre:string,
        public _descripcion:string,
        public _precio:number,
    )
    {}

    
    public get idTarifa() : string {
        return this._idTarifa;
    }
    public get nombre() : string {
        return this._nombre;
    }
    public get descripcion() : string {
        return this._descripcion;
    }
    public get precio() : number {
        return this._precio;
    }number

    
} 