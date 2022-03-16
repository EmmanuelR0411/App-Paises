import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [ `
    li{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  status: string = '';
  

  constructor(private paisService: PaisService) { }

  buscar( termino: string ){
    this.status = 'display: block;';

    this.termino = termino;
    
    this.mostrarSugerencias = false;
    

    if(this.termino.trim().length == 0){
      return;
    }

    this.hayError = false;
    console.log(this.termino)

    this.paises = [];

    this.paisService.buscarPais( this.termino )
      .subscribe( ( paises ) => {
        console.log(paises);
        this.status = 'display: none;';
        this.paises = paises;
        
      }, (err) => {
        this.hayError = true;
        this.status = 'display: none;';
        this.paises = [];
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais( termino )
        .subscribe( (paises) => {
          this.paisesSugeridos = paises.splice(0, 5);
        },
        (err) => {
          this.paisesSugeridos = [];
        })
  }

}
