import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  body: any;

  @Input('body')
  set bodyContent(value: any) {
    this.body = value
  }

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
