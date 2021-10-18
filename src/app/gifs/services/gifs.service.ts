import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _searchRecord: string[]=[];
  public results: Gif [] = [];
  get searchRecord(){
    return this._searchRecord;
  }
  constructor(private http:HttpClient){
    if(localStorage.getItem('record') && localStorage.getItem('lastResults')){
      this._searchRecord = JSON.parse(localStorage.getItem('record') !);
      this.results = JSON.parse(localStorage.getItem('lastResults')!);
    }

  }
   apiKey = environment.apiKey;
   apiUrl= environment.apiUrl;
  searchGifs(query:string){
    query=query.trim().toLowerCase();

    if (!this._searchRecord.includes(query)){
        this._searchRecord.unshift(query);
        this._searchRecord = this._searchRecord.splice(0,10);

    }
    else{
      var index = this._searchRecord.indexOf(query);
        if (index !== -1) {
          this._searchRecord.splice(index, 1);
        }
        this._searchRecord.unshift(query);
        this._searchRecord = this._searchRecord.splice(0,10);

    }
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query );
    localStorage.setItem('record',JSON.stringify(this._searchRecord));
      this.http.get<SearchGifsResponse>(`${this.apiUrl}/search`,{params})
        .subscribe((resp:SearchGifsResponse)=>{
          console.log(resp.data);
          this.results=resp.data;
          localStorage.setItem('lastResults', JSON.stringify(this.results));
        })
    console.log(this._searchRecord);
  }


}
