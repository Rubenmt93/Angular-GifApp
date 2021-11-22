import { isLoweredSymbol } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  constructor( private gifsService: GifsService){}
  buscar(termino:string){
    const valor = this.txtBuscar.nativeElement.value
    if(valor.trim().length===0){return}
    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value='';
   
  }
  

}
