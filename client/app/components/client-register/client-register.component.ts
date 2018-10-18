import { Component, OnInit } from '@angular/core';
import { ClientRegisterService } from '../../services/client-service/client-register.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PasswordValidation } from '../../services/client-service/PasswordValidation';
import { DatepickerModule, BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css'],
  providers: [ClientRegisterService]
})
export class ClientRegisterComponent implements OnInit {
  datepickerConfig: Partial<BsDatepickerConfig>;

  myDateValue: Date;

  form = new   FormGroup({
    _id : new FormControl(),
    FirstName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    LastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.pattern('[a-zA-Z]*')
    ]),
    // MobileNo: new FormControl('',[
    //   Validators.required,
    //   Validators.maxLength(10),
    //   Validators.pattern('[0-9]*')
    // ]),
    Email: new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    // DOB: new FormControl('',[
    //   Validators.required
    // ]),
    Password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16)
    ]),
    ConfirmPassword: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      // your validation method
    ])
    }, PasswordValidation.MatchPassword
  // this.passwordMatchValidator
  );

  passwordMatchValidator(form: FormGroup) {
    return form.controls['Password'].value === form.controls['ConfirmPassword'].value ? null : {'mismatch': true};
  }

    get FirstName() { return this.form.get('FirstName'); }

    get LastName() { return this.form.get('LastName'); }

    // get MobileNo() { return this.form.get('MobileNo'); }

    get Email() { return this.form.get('Email'); }

    // get DOB() { return this.form.get('DOB'); }

    get Password() { return this.form.get('Password'); }

    get ConfirmPassword() { return this.form.get('ConfirmPassword'); }

  constructor(public clientRegisterService: ClientRegisterService, private toastr: ToastrService) {
    this.datepickerConfig = Object.assign({}, {containerClass: 'theme-blue'});
  }


  ngOnInit() {
    this.resetForm();
    this.myDateValue = new Date();
  }
  resetForm(form?: NgForm){
    if(form != null)
    form.reset();

   this.clientRegisterService.selectedRegisterClinet= {
    _id : "",
    FirstName : "",
    LastName :"",
    Email : "",
    Password : "",
    IsAdmin: false
    }
  }


  saveData(form?: NgForm) {
    if(form.value._id === '' || form.value._id === null) {
      this.clientRegisterService.postClientRegister(form.value)
      .subscribe(res => {
        this.resetForm(form);
      this.toastr.success('New Registration Succesfully');
      });
    }
  }

}
