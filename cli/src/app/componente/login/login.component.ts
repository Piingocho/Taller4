import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginserviceService } from 'app/service/loginservice.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private loginService: LoginserviceService, private router: Router) { }

  ngFormLogin: FormGroup;

  ngOnInit() {
    if(this.loginService.getUser){
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
          this.router.navigate(['/dashboard']);
        }
      },
      err => {

      }
    )

  }
}
