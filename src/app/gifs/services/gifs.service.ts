import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private _tagsHistory: string[]=[]; //private para evitar modificación desde cualquier dirección
  
  constructor() { }

  /**
   * To return history data and block any update
   */
  get tagsHistory(){
    return [...this._tagsHistory]
  }

  searchTag(tag:string):void{
    this._tagsHistory.unshift(tag)
  }

}
