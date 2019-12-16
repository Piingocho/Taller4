import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ModalService } from 'app/service/modal.service';




@Component({
  selector: 'app-productoform',
  templateUrl: './productoform.component.html',
  styleUrls: ['./productoform.component.scss']
})
export class ProductoformComponent implements OnInit {
  @Input() id: string;
  private element: any;
  @ViewChild('basicModal',{ static:true }) basicModal: ElementRef;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.basicModal.show();
  }

  close(): void {
    this.basicModal.hide()
  }

}
