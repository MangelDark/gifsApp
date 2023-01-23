import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  buscar(){

    const valor = this.txtBuscar.nativeElement.value;
    if(valor.trim().length === 0)return;
    this.gifsService.burcarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  }

}
