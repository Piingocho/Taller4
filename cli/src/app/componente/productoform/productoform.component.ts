import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ModalService } from 'app/service/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from 'app/service/loginservice.service';
import { isNull, isNumber } from 'util';


// declare global {
//   interface ElementRef {
//     show(): any,
//     hide(): any,
//   }
// }

declare var $: any;
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
    if (isNull(nombre) || nombre === "") {
      this.showNotification("Ingrese el nombre del producto", 'danger');
    }
    if (isNull(idproducto) || idproducto === "") {
      this.showNotification("Ingrese un ID para el producto", 'danger');
    }
    if (isNull(costo) || costo === "" || !isNumber(Number(costo))) {
      this.showNotification("Ingrese un costo para el producto", 'danger');
    }
    if (isNull(nombre) || nombre === "" || isNull(idproducto) || idproducto === "" || isNull(costo) || costo === "" || !isNumber(Number(costo))) {
      return null;
    }

    const producto = {
      nombre,
      idproducto,
      costo
    };
    console.log(this.formValue, producto);
    this.loginService.addInventario(producto)
      .subscribe(
        res => {
          console.log(res);
          this.modalService.close(this.id);
          this.showNotification(res.mensaje,'info');
          this.ngFormProducto.setValue({
            nombre: '',
            idproducto: '',
            costo: ''
          })
        },
        err => {
          console.log("err", err);
        }
      )
  }

  showNotification(message: string, color: string = "success", from: string = "top", align: string = "center") {
    // const type = ['', 'info', 'success', 'warning', 'danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: color,//type[color],
      timer: 1000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
