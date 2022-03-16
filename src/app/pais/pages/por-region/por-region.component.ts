import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button{
        margin-right: 5px;
      }
    `
  ]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';

  paises: Country[] = [];

  status: string = '';


  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  activarRegion( region: string ){
    this.status = 'display: block;';

    if( region === this.regionActiva ) { 
      this.status = 'display: none;';
      return; 
    }
    
    this.paises = [];
    this.regionActiva = region;

    this.paisService.getPaisPorRegion( region )
        .subscribe( res => {
          this.paises = res;
          this.status = 'display: none;';
        })
    
  }

  getClass( region: string ): string{
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary'
  }

}
