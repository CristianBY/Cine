import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from 'src/servicios/peticiones.servicio';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public fregistro: FormGroup;

  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion, private router:Router, private fb: FormBuilder) { 
    this.fregistro = this.fb.group({
      nombreRegistro: ['',Validators.required],
      apellidosRegistro: ['',Validators.required],
      emailRegistro: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      passwordRegistro1: ['',Validators.required],
      passwordRegistro2: ['',Validators.required]
    });
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    }
  }


  registraUsuario(){
  
    if(this.fregistro.get('nombreRegistro').hasError('required')){
      document.getElementById('nombreRegistro').classList.add('is-invalid');
    }
    if(this.fregistro.get('apellidosRegistro').hasError('required')){
      document.getElementById('apellidosRegistro').classList.add('is-invalid');
    }
    if(this.fregistro.get('emailRegistro').hasError('required') || this.fregistro.get('emailRegistro').hasError('pattern')){
      document.getElementById('emailRegistro').classList.add('is-invalid');
      if(this.fregistro.get('emailRegistro').hasError('pattern')){
        document.getElementById('emailRegistro').nextSibling.textContent='Formato no válido';
      }
    }
    if(this.fregistro.get('passwordRegistro1').hasError('required')){
      document.getElementById('passwordRegistro1').classList.add('is-invalid');
    }
    if(this.fregistro.get('passwordRegistro2').hasError('required') || this.fregistro.value.passwordRegistro2 != this.fregistro.value.passwordRegistro1){
      document.getElementById('passwordRegistro2').classList.add('is-invalid');
      if (this.fregistro.value.passwordRegistro2 != this.fregistro.value.passwordRegistro1){
        document.getElementById('passwordRegistro2').nextSibling.textContent='Las contraseñas no coinciden';
      }
    }    
    
    if (!this.fregistro.invalid) {
      let nuevoUsuario = new Usuario(0,this.fregistro.value.nombreRegistro,this.fregistro.value.apellidosRegistro,this.fregistro.value.emailRegistro,this.fregistro.value.passwordRegistro1,false);

      this._peticionesServicio.addUsuarioServer(nuevoUsuario).subscribe(data=>{
        sessionStorage.clear();
        this._peticionesServicio.getUsuariosJSON(this.fregistro.value.passwordRegistro1,this.fregistro.value.emailRegistro).subscribe(data=>{
          if (data.token != "No") {
            sessionStorage.setItem('token',data.token);
            sessionStorage.setItem('idUsuario',data.idUsuario);
            sessionStorage.setItem('username',data.nombre);
            
            this.router.navigate(['']);
            }
    
        });
  
      });
    }  
  }

}
