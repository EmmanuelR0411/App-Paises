import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @Input() lat: number = 0;
  @Input() lng: number = 0;


  options: google.maps.MapOptions = {
    center: {lat: 19.43, lng: -99.13},
    zoom: 10
  };

  center: google.maps.LatLngLiteral = {
    lat: 0, 
    lng: 0
  };
  zoom = 6;

  constructor() { }

  ngOnInit(): void {
    
    this.center = {
      lat: this.lat, 
      lng: this.lng
    };

  }

}
