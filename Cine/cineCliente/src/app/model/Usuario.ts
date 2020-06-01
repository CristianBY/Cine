export class Usuario {
    constructor(
        public idUsuario :number,
        public nombre:string,
        public apellidos:string,
        public email:string,
        public password:string,
        public administrador:boolean
    )
    {}
}
