import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginserviceService } from 'app/service/loginservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private loginService: LoginserviceService, private router:Router) { }
  
  ngFormLogin: FormGroup;

  ngOnInit() {
    $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
   this.ngFormLogin = this.formBuilder.group({
     email: ['', Validators.required],
     password: ['',Validators.required]
   });

  }

  private get formValue(){
    return this.ngFormLogin.controls;
  }

  onLogin(){
    const email= this.formValue.email.value;
    const password= this.formValue.password.value;
    this.loginService.login({email, password});
    const user = this.loginService.getUser;
    console.log(user);
    if(user){
      this.router.navigate(['/dashboard']);
    }
  }
}
