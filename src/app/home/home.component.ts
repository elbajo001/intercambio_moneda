import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Datos } from '../modelos/datos';
import { DataService } from '../shared/data.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public datos: Datos = new Datos();
  public rates?: Array<any> = new Array<any>();
  public resultado?: number;
  public denominacion?: string;
  public value?: string = 'USD';

  public today: Date = new Date();
  public dd:string = String(this.today.getDate());
  public mm:string = String(this.today.getMonth()+1);
  public yyyy? = this.today.getFullYear();
  public auxToday = "";

  formularioDatos!: FormGroup;
  
  constructor(private dataSvc:DataService, private fbGenerator:FormBuilder) { }
  
  ngOnInit(): void {
    
    this.dataSvc.getData().subscribe((newDatos) => {
      this.datos = newDatos;
      this.rates = this.datos.rates;
    })
    
    if (this.dd.length < 2) {
      this.dd = '0'+this.dd
    }
    if (this.mm.length < 2) {
      this.mm = '0'+this.mm
    }

    this.auxToday = String(this.yyyy + "-" + this.mm + "-" + this.dd);
    this.formularioDatos = this.fbGenerator.group({
      fecha: [this.auxToday, Validators.required],
      cantidad: ['0', Validators.required],
      tipo: [String(this.value), Validators.required],
    })
  }

  validar(event:any){
    var d1 = new Date(event.value);
    var d2 = new Date();

    if(d1.getTime()>d2.getTime()){
      this.formularioDatos.patchValue({fecha:this.auxToday})
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha no puede ser superar a la fecha actual',
      })
    }
  }

  calcularResultado(){
    this.denominacion = ""
    this.value = ""
    this.datos = this.formularioDatos.value as Datos;
    let denominacionAux = this.formularioDatos.value.tipo.split("");
    for (let i = 0; i < 3; i++) {
      this.denominacion += denominacionAux[i];
    }
    for (let i = 3; i < this.formularioDatos.value.tipo.split("").length; i++) {
      this.value += denominacionAux[i];
    }
    this.resultado = this.formularioDatos.value.cantidad * Number(this.value);
  }
}
