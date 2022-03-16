import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country, Translation } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country[];
  translations: string[] = [];

  nombreMoneda: string[] = [];
  simboloMoneda: string[] = [];

  lat: number = 0;
  lng: number = 0;

  status: string = '';

  constructor( 
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService 
    ) { }

  ngOnInit(): void {
      
    this.status = 'display: block;';
    this.activatedRoute.params
      .pipe(
        //  En lugar de retornar el observable de activatedRoute retorna el de getPaisPorAlpha
        switchMap( ( { id } ) => this.paisService.getPaisPorAlpha( id ) ),
        tap( res => {
          const { latlng  } = res[0]

          this.lat = latlng[0];
          this.lng = latlng[1];
  
          console.log(this.lat, this.lng)
        } )
      )
      .subscribe( pais => {
        this.pais = pais;
        this.status = 'display: none;';

        console.log(this.lat, this.lng)


        const { translations, currencies } = this.pais[0];

        //Pasamos los objetos a un arreglo
        const elementos = Object.values(translations);

        const moneda = Object.values(currencies);

        for(let i = 0; i < elementos.length; i++ ){
          this.translations.push( elementos[i].common )
        }

        for(let i = 0; i < moneda.length; i++ ){
          this.nombreMoneda.push( moneda[i].name )
        }

        for(let i = 0; i < moneda.length; i++ ){
          this.simboloMoneda.push( moneda[i].symbol )
        }
      })

    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     this.paisService.getPaisPorAlpha( id )
    //       .subscribe( pais => {
    //         console.log(pais)
    //       })
    //   }) 

  }

}
