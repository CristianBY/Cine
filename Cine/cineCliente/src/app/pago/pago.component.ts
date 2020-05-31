import { Component, OnInit } from '@angular/core';
import { PeticionesServicio } from 'src/servicios/peticiones.servicio';
import { UsuarioSesion } from 'src/servicios/usuarioSesion';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  public multimediaInfo:Array<any> = [];
  public reserva:Array<any> = [];
  public entradas: number;
  public fpaypal: FormGroup;
  public ftarjeta: FormGroup;
  public listaMeses = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
  public listaAnyos = new Array();


  constructor(private _peticionesServicio: PeticionesServicio, private _usuarioSesion: UsuarioSesion, private router:Router, private fb: FormBuilder) 
  {
    this.fpaypal = this.fb.group({
      usuarioPagoPP: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      clavePP: ['',Validators.required]
    });

    this.ftarjeta = this.fb.group({
      numCuenta: ['',[Validators.required,Validators.pattern('^[0-9]{16}')]],
      mesCaducidad: ['',Validators.required],
      anyoCaducidad: ['',Validators.required],
      claveCVV: ['',[Validators.required,Validators.pattern('^[0-9]{3}')]]
    });
  }

  ngOnInit(): void {
    this.getMultimedia();
    this.getReserva();
    this.cargarAnyos();
    if (sessionStorage.getItem('token') != "No" && sessionStorage.getItem('token') != null) {
      this._usuarioSesion.comprobarSesion();
    } else {
      this.router.navigate(['']);
    }
    
  }

  cargarAnyos(){
    let year = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
      this.listaAnyos.push(year+i);
    }
  }

  getMultimedia(){
    this._peticionesServicio.getMultimediaJSON().subscribe(data=>{
      this.multimediaInfo = data;
    });
  }

  getReserva() {
    let idProyeccion = sessionStorage.getItem('compra');
    this._peticionesServicio.getReservaJSON(idProyeccion).subscribe(data=>{
      this.reserva = data;
    });
  }

  mostrar(precio){
    this.entradas = parseInt((<HTMLInputElement>document.getElementById('butacaReservada')).value);
    this.entradas *= parseInt(precio); 
  }

  procesoDePagoPaypal(){
    if (this.fpaypal.invalid) {
      this.fpaypal.reset();
      document.getElementById('usuarioPagoPP').classList.add('is-invalid');
      document.getElementById('clavePP').classList.add('is-invalid');
    }else{
      let butaca = (<HTMLInputElement>document.getElementById('butacaReservada')).value;
      let data = {
        'butaca' : butaca,
        'idProyeccion' : sessionStorage.getItem('compra'),
        'idUsuario' : sessionStorage.getItem('idUsuario')
      }
      this._peticionesServicio.resevaServer(data).subscribe(data=>{
        let altura=380;
        let anchura = 630;
        let y=(window.screen.height/2)-(altura/2);
        let x=(window.screen.width/2)-(anchura/2);
        let w = window.open('','','width='+anchura+',height='+altura+',top='+y+',left='+x+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,directories=no,resizable=no');
        w.document.write('Conectando con Paypal ...');
        w.focus();
        setTimeout(()=>{
          w.close();
        }, 1500);
        
        setTimeout(()=>{
          this.router.navigate(['']);
        },1600);
      });
    }
  }

  procesoDePagoTarjeta(){
    if (this.ftarjeta.invalid) {
      this.ftarjeta.reset();
      document.getElementById('numCuenta').classList.add('is-invalid');
      document.getElementById('mesCaducidad').classList.add('is-invalid');
      document.getElementById('anyoCaducidad').classList.add('is-invalid');
      document.getElementById('claveCVV').classList.add('is-invalid');
    }else{
      let butaca = (<HTMLInputElement>document.getElementById('butacaReservada')).value;
      let data = {
        'butaca' : butaca,
        'idProyeccion' : sessionStorage.getItem('compra'),
        'idUsuario' : sessionStorage.getItem('idUsuario')
      }
      this._peticionesServicio.resevaServer(data).subscribe(data=>{
        let altura=380;
        let anchura = 630;
        let y=(window.screen.height/2)-(altura/2);
        let x=(window.screen.width/2)-(anchura/2);
        let w = window.open('','','width='+anchura+',height='+altura+',top='+y+',left='+x+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,directories=no,resizable=no');
        w.document.write('Conectando con el Banco ...');
        w.focus();
        setTimeout(()=>{
          w.close();
        }, 1500);
        
        setTimeout(()=>{
          this.router.navigate(['']);
        },1600);
      });
    }
  }

}
