import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private modalService: NgbModal) { }

  openModal(option: any) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.body = option;
  }
}
