import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  status: string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {}

  buscar( termino: string ){
    this.termino = termino;
    this.status = 'display: block;';

    if(this.termino.trim().length == 0){
      return;
    }

    this.hayError = false;
    console.log(this.termino)

    this.paises = [];

    this.paisService.buscarCapital( this.termino )
      .subscribe( ( paises ) => {
        console.log(paises);
        this.paises = paises;
        this.status = 'display: none;';
      }, (err) => {
        this.hayError = true;
        this.paises = [];
        this.status = 'display: none;';
      });
  }

}
