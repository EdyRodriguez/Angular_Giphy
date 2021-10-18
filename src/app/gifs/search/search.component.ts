import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService){

  }
  search(value : string){
    if(value.trim().length === 0){
      return;
    }
    this.gifsService.searchGifs(value);
    this.txtSearch.nativeElement.value = '';
  }
}
