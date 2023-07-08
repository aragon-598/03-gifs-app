import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey:string = 'r6Rp2tXECSRtVqO926d68LAaWkV9Y29J';
  public gifList:Gif[]=[];
  private request:string=`http://api.giphy.com/v1/gifs`;
  private _tagsHistory: string[]=[]; //private para evitar modificación desde cualquier dirección
  
  constructor(private httpClient:HttpClient) { 
    this.loadLocalStorage();
  }

  /**
   * To return history data and block any update
   */
  get tagsHistory(){
    return [...this._tagsHistory]
  }

  private organizeHistory(tag:string):void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> tag!==oldTag) // filtrando coincidencias 
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
    
  }

  private saveLocalStorage():void {
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!) // "!" siempre vendrá un valor

    if (this._tagsHistory.length===0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string):void{
    if (tag.length===0) return;
    this.organizeHistory(tag);

    const params = new HttpParams().set('api_key',this.apiKey)
                                   .set('limit','10')
                                   .set('q',tag)

    this.httpClient.get<SearchResponse>(`${this.request}/search`,{params})
                    .subscribe(res =>{
                      this.gifList=res.data;
                      
                    })
  }

}
