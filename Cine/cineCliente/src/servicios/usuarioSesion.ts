import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})

export class UsuarioSesion {
    constructor(private router:Router) { 

    }

    comprobarSesion(){
        if(sessionStorage.getItem('token')!=null){
            document.getElementById("usuarioSesion").style.display="none";
            document.getElementById("logueado").style.display="none";
            document.getElementById("usuarioEnlaceHome2").textContent= "Hola "+sessionStorage.getItem('username');
            document.getElementById("usuarioEnlaceHome2").style.display="inline";
            document.getElementById("deslogueado").style.display="inline";
        }
        if(sessionStorage.getItem('role')=="true"){
            
        }
    }

    cierraSesion(){
        setInterval(()=>{
            sessionStorage.clear();
            this.router.navigate(['']);
        })
        
    }

}