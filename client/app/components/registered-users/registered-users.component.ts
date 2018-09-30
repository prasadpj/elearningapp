import { Component, OnInit } from '@angular/core';
import { ClientRegisterService } from '../../services/client-service/client-register.service';
import { ToastrService } from 'ngx-toastr';
import { ClientRegister } from '../../services/client-service/client-register.model';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  constructor(public clientRegisterService: ClientRegisterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshUsersList();
  }
  UsersList;
  refreshUsersList() {
    this.clientRegisterService.getClientRegisterList().subscribe((res) => {
      this.UsersList = res as ClientRegister[];
    });
  }
  UserDetail;
  onView(clientReg: ClientRegister) {
    this.UserDetail = clientReg;
  }

  updateDetails(clientReg: ClientRegister) {


    clientReg.IsAdmin = !clientReg.IsAdmin;
    //console.log(!clientReg.IsAdmin);
    this.clientRegisterService.putClientRegister(clientReg)
      .subscribe(res => {
        this.refreshUsersList();
        this.toastr.success('New Registration Succesfully');
      });


  }
}
