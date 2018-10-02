import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  form = new FormGroup({
    _id : new FormControl(),
    Email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  get Email() { return this.form.get('Email'); }


  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
