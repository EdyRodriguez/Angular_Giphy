import { Component, } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor(private gifsService : GifsService){

  }
  get searchRecord(){

   return this.gifsService.searchRecord;
  }
  search(item:string){
    this.gifsService.searchGifs(item);
  }
}
