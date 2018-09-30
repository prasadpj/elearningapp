import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../services/login/login.model';
import { ClientRegisterService } from '../../services/client-service/client-register.service';
import { ClientRegister } from '../../services/client-service/client-register.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form= new FormGroup({
    _id : new FormControl(),
    Email: new FormControl('',[
      Validators.required,
      Validators.min(5),
      Validators.email
    ]),
    Password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    });
    
    get Email() { return this.form.get('Email'); }

    get Password() { return this.form.get('Password'); }

    constructor(public loginService: LoginService,public clientRegisterService: ClientRegisterService, private toastr: ToastrService) { }

    ngOnInit() {
      this.resetForm();
    
  }
 resetForm(form?: NgForm){
    if(form != null)
    form.reset();
   this.loginService.selectedLogin= {
    _id : "",
    Email : "",
    Password : "",
    }
  }

  singleLogin;
 

  login(form?: NgForm) {
   this.clientRegisterService.getSingleLogin(form.value).subscribe((res) => {
      this.singleLogin = res as ClientRegister[];

      this.clientRegisterService.setUser(res[0]);


      if(this.singleLogin.length > 0)
      this.toastr.success('Login Successfull!');
      else
      this.toastr.warning('Login Failed!');
      
    });
  }
}
