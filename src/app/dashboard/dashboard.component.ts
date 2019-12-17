import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';
import { LoginserviceService } from 'app/service/loginservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from 'app/service/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private loginService: LoginserviceService, private router: Router, private modalService: ModalService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  private inventario = [];

  deleteCuenta(idproducto: string | number) {
    this.loginService.deleteProducto(idproducto)
      .subscribe(
        res => {
          this.updateInventario();
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
  }

  private modalFormP;
  validatingForm: FormGroup;
  private showForm:boolean=false;


  closeModal(idform:string){
    this.modalService.close(idform);
  }

  agregarProducto() {
    this.modalService.open("formProducto");
    // this.loginService.addInventario({ idproducto: '53432', nombre: "algo", costo: "23" })
    //   .subscribe(
    //     res => {
    //       this.updateInventario();
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err)
    //     }
    //   )
  }

  updateInventario() {
    this.loginService.getInventario().subscribe(
      res => {
        // console.log(res);
        this.inventario = res;
      }, err => {
        console.log(err);
      }
    )
  }
  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  private updateTimer:any;

  ngOnDestroy(){
    clearInterval(this.updateTimer);
  }

  ngOnInit() {
    this.updateInventario();
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });

    this.modalService.currentModal.subscribe(
      res=>{
        if(!res){
          this.updateInventario();
        }
        console.log("UPDATE",res);
      },
      err=>{
        console.log("UPDATE2");
      }
    )

    this.updateTimer=setInterval(()=>{
      this.updateInventario();
    },5000);

   
  }

}
