import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ModalService } from 'app/service/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from 'app/service/loginservice.service';


// declare global {
//   interface ElementRef {
//     show(): any,
//     hide(): any,
//   }
// }


@Component({
  selector: 'app-productoform',
  templateUrl: './productoform.component.html',
  styleUrls: ['./productoform.component.scss']
})
export class ProductoformComponent implements OnInit {
  @Input() id: string;
  private element: any;
  // @ViewChild('basicModal', { static: true }) basicModal: ElementRef;

  ngFormProducto: FormGroup;

  constructor(private modalService: ModalService, private el: ElementRef, private formBuilder: FormBuilder,
    private loginService: LoginserviceService) {
    this.element = el.nativeElement;
  }

  private get formValue() {
    return this.ngFormProducto.controls;
  }

  ngOnInit(): void {
    let modal = this;
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });
    this.modalService.add(this);
    this.ngFormProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      idproducto: ['', Validators.required],
      costo: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    // this.element.style.display = 'block';
    // this.basicModal.nativeElement.display = 'block';
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    // this.basicModal.show();
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    // this.basicModal.nativeElement.display = 'none';

    // this.basicModal.nativeElement.hide;
    // this.basicModal.hide()
  }

  closeModal() {
    this.modalService.close(this.id);
  }

  addProduct() {
    const nombre = this.formValue.nombre.value;
    const idproducto = this.formValue.idproducto.value;
    const costo = this.formValue.costo.value;
    const producto = {
      nombre,
      idproducto,
      costo
    };
    console.log(this.formValue);
    this.loginService.addInventario(producto)
      .subscribe(
        res => {
          console.log(res);
          this.modalService.close(this.id);
          this.ngFormProducto.setValue({
            nombre:'',
            idproducto:'',
            costo: ''
          })
        },
        err => {
          console.log("err", err);
        }
      )
  }
}
