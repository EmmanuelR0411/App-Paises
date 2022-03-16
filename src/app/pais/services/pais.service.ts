import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams(){
    return new HttpParams().set( 'fields', 'name,capital,population,cca2,flags' );
  }

  constructor( private htpp: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]>{

    const url = `${ this.apiUrl }/name/${ termino }`;

    return this.htpp.get<Country[]>( url, { params: this.httpParams } );
    
  }

  buscarCapital( termino: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ termino }`;

    return this.htpp.get<Country[]>( url, { params: this.httpParams } );
  }

  getPaisPorAlpha( termino: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/alpha/${ termino }`;

    return this.htpp.get<Country[]>( url );
  }

  getPaisPorRegion( region: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.htpp.get<Country[]>( url, { params: this.httpParams } )
            .pipe(
              tap(console.log)
            )
  }

}
