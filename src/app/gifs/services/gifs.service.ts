import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey:string = 'r6Rp2tXECSRtVqO926d68LAaWkV9Y29J';

  private request:string=`http://api.giphy.com/v1/gifs`;

  private _tagsHistory: string[]=[]; //private para evitar modificación desde cualquier dirección
  
  constructor(private httpClient:HttpClient) { }

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
    console.log(this._tagsHistory);
    
  }

  searchTag(tag:string):void{
    if (tag.length===0) return;
    this.organizeHistory(tag);

    const params = new HttpParams().set('api_key',this.apiKey)
                                   .set('limit','10')
                                   .set('q',tag)

    this.httpClient.get(`${this.request}/search`,{params})
                    .subscribe(res =>{
                      console.log(res);
                      
                    })
  }

}
