import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../gifs-page/interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private api_key :string = 'wRhdXSZwdbwKGEKQXt8IpPiOzCibdQMN';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'
  private _historial: string[] =[];
  //Cambiar any por tipo correcto
  public resultados: Gif[] =[];
  get historial() {
    return [...this._historial];
  }
  constructor(private http: HttpClient){
    this._historial= JSON.parse(localStorage.getItem('historial')!) || []
    this.buscarGifs(localStorage.getItem('ultima')! || "") 
  }
  buscarGifs(query: string){   
    query=query.trim().toLowerCase();
    localStorage.setItem('ultima',query);
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify( this._historial ))
      
    }
    const params= new HttpParams()
    .set('api_key',this.api_key)
    .set('limit','10')
    .set('q',query);    

    //this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=wRhdXSZwdbwKGEKQXt8IpPiOzCibdQMN&q=${ query } z&limit=10`)
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
    .subscribe( (resp) =>{
      console.log(resp.data);
      this.resultados=resp.data;
    });
  }
}
