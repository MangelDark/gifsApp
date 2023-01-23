import { Gif, SearchGifsResponse } from './../interfaces/gifs.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private URL: string = 'https://api.giphy.com/v1/gifs/search'
  private apikey: string = 'UC6IzTFukkIrWDleKWv6IMW2qftRwZJa';
  private _historial:  string[]=[]
  //TODO: Cambiar any por su tipo de dato correspondiente
  public resultados: Gif[] = []
  get historial(){
    return [...this._historial]
  }
  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  burcarGifs( query: string ){
    query = query.trim().toLowerCase();
    if( !this._historial.includes(query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    this.http.get<SearchGifsResponse>(`${this.URL}?api_key=${this.apikey}&q=${query}&limit=10`)
    .subscribe( ( resp ) => {
      console.log(resp.data)
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))

    });
  }
}
