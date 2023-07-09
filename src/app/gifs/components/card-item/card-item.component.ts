import { Gif } from './../../interfaces/gifs.interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gifs-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit{

  constructor() {}

  @Input()
  public gif!:Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required.');
  }

}
