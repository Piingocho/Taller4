import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginserviceService } from 'app/service/loginservice.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginserviceService, private router: Router) { }

  ngFormLogin: FormGroup;

  ngOnInit() {
    if (this.loginService.getUser) {
      this.router.navigate(['/dashboard']);
    }

    $('.message a').click(function () {
      $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
    this.ngFormLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  private get formValue() {
    return this.ngFormLogin.controls;
  }

  onLogin() {
    const email = this.formValue.email.value;
    const password = this.formValue.password.value;
    this.loginService.login({ email, password }).pipe(first()).subscribe(
      res => {
        // const user = this.loginService.getUser;
        console.log(res);
        if (res) {
          this.showNotification("Acceso exitoso")
          this.router.navigate(['/dashboard']);
        }
      },
      err => {

      }
    )

  }



  showNotification(message: string, color: number = 2, from: string = "top", align: string = "center") {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: message

    }, {
      type: type[color],
      timer: 3000,
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
