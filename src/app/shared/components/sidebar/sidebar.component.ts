import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  constructor(private gifsService:GifsService) {}

  get historyTags(){
    return this.gifsService.tagsHistory;
  }

  searchHistoryTag(tag:string){
    this.gifsService.searchTag(tag);
  }

}
