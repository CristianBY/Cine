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
      mesCaducidad: [,Validators.required],
      anyoCaducidad: [,Validators.required],
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

  /**
   * Crea una lista con los siguientes 6 años para la verificación de la tarjeta de crédito
   */
  cargarAnyos(){
    let year = new Date().getFullYear();
    for (let i = 0; i < 6; i++) {
      this.listaAnyos.push(year+i);
    }
  }

  /**
   * Obtiene el JSON multimedia de assets
   */
  getMultimedia(){
    this._peticionesServicio.getMultimediaJSON().subscribe(data=>{
      this.multimediaInfo = data;
    });
  }

  /**
   * Pide la información de una reserva para generar la página (butacas disponibles, nombre película, hora, ..)
   */
  getReserva() {
    let idProyeccion = sessionStorage.getItem('compra');
    this._peticionesServicio.getReservaJSON(idProyeccion).subscribe(data=>{
      this.reserva = data;
    });
  }

  /**
   * Según las entradas seleccionadas modifica el precio 
   * @param precio 
   */
  mostrar(precio){
    this.entradas = parseInt((<HTMLInputElement>document.getElementById('butacaReservada')).value); //parse en TypeScript el de JS no funciopna
    this.entradas *= parseInt(precio); 
  }

  /**
   * Formulario para el pago por paypal si todo va bien muestra una ventana simulando el pago y la conexión a Paypal
   */
  procesoDePagoPaypal(){
    if (this.fpaypal.invalid) {
      this.fpaypal.reset();
      if (this.fpaypal.get('usuarioPagoPP').hasError('required') || this.fpaypal.get('usuarioPagoPP').hasError('pattern')){
        document.getElementById('usuarioPagoPP').classList.add('is-invalid');
        if (this.fpaypal.get('usuarioPagoPP').hasError('pattern')) {
          document.getElementById('usuarioPagoPP').nextSibling.textContent='Formato no válido';
        }
      }
      if (this.fpaypal.get('clavePP').hasError('required')){
        document.getElementById('clavePP').classList.add('is-invalid');
      }
        
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

  /**
   * Formulario de pago con tarjeta
   */
  procesoDePagoTarjeta(){
    if (this.ftarjeta.invalid) {
      this.ftarjeta.reset();
      if (this.ftarjeta.get('numCuenta').hasError('required') || this.ftarjeta.get('numCuenta').hasError('pattern')) {
        document.getElementById('numCuenta').classList.add('is-invalid');
      }
      if (this.ftarjeta.get('mesCaducidad').hasError('required')) {
        document.getElementById('mesCaducidad').classList.add('is-invalid');
      }
      if (this.ftarjeta.get('anyoCaducidad').hasError('required')) {
        document.getElementById('anyoCaducidad').classList.add('is-invalid');
      }

      if (this.ftarjeta.get('claveCVV').hasError('required') || this.ftarjeta.get('claveCVV').hasError('pattern')) {
        document.getElementById('claveCVV').classList.add('is-invalid');
      }
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
