import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Datos } from '../modelos/datos'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ruta: string = 'http://api.exchangeratesapi.io/v1/latest?access_key=b4fe4b2739a1ff7f0183d5202c24821d'
  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<Datos>(this.ruta);
  }
}
