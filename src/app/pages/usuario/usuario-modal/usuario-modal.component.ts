import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {
  @Input() modalRef?: BsModalRef
  @Input() usuario?: string
  @Input() status: boolean = false
  @Output() closeModal  = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

  actionCloseModal(option: boolean) {
    this.closeModal.emit(option)
  }


}
