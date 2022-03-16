import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

  

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();  

  termino: string = '';
  @Input() placeholder: string = '';

  constructor() { }

  ngOnInit() {
  
    this.debouncer
    //El pipe nos permite transformar la salida del subscribe
      .pipe(
        debounceTime(300) 
          /*Con debounceTime sirve para que no se emita el subscribe hasta que el debauncer deje de emitir valores durante 
          300 milesimas de segundo*/
      )
      .subscribe( valor => {
        this.onDebounce.emit( valor );
    } )
  }

  buscar(){
    this.onEnter.emit( this.termino );
    this.termino = '';
  }
  
  teclaPresionada(){
    this.debouncer.next( this.termino );
  }

}
