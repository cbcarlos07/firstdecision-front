import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { tap, switchMap } from 'rxjs/operators'
import { timer } from 'rxjs';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility',[
       state('hidden', style({
         opacity: 1,
         bottom: '-70px'
       })),
       state('visible', style({
         opacity: 1,
         bottom: '2px'
       })),
       transition('hidden => visible', animate('500ms 0s ease-in')),
       transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]

})
export class SnackbarComponent implements OnInit {
  message: string = 'Hello There'
  snackVibility: string = 'hidden'
  alerta?: string
  constructor(private service: MessageService) { }

  ngOnInit() {
    this.alertaMsg()
  }

  alertaMsg(){
    this.service
        .notifier
        .pipe(
          tap( (obj: any) =>{
            
            this.message = obj.message
            this.snackVibility = 'visible'
            
            this.alerta = obj.status == true ? 'alert-success' : 'alert-danger'
            
            
          }),
          switchMap( message => timer(3000) )
        ).subscribe( timer => this.snackVibility = 'hidden' )
  }


}
