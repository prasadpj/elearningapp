import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientRegister } from './client-register.model';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  selectedRegisterClinet: ClientRegister;


  private url = 'http://localhost:3000/user';
  constructor(private http: HttpClient) { }

  postClientRegister(clientRegister: ClientRegister) {
    return this.http.post(this.url, clientRegister);
  }

  getClientRegisterList() {
    return this.http.get(this.url);
  }

  putClientRegister(clientRegister: ClientRegister) {
    return this.http.put(this.url + `/${clientRegister._id}`, clientRegister);
  }

  deleteClientRegister(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

  getSingleLogin(clientRegister: ClientRegister) {
    return this.http.post(this.url + '/login', clientRegister);
  }

  userObject: any;

  setUser(obj) {
    this.userObject = obj;
    localStorage.setItem('userObj', JSON.stringify(this.userObject));
  }
  getToken() {
    var item = this.getUser();
    if (item) {
      return item.Token
    }
    return ""
  }
  isAdmin() {
    // return true;
    var item = this.getUser();

    if (item != null && item.IsAdmin == true) {
      return true;
    }
    else {
      return false;
    }

  }

  getUser() {
    if (!this.userObject && !localStorage.getItem('userObj')) {
      return null;
    }
    if (localStorage.getItem('userObj')) {
      this.userObject = JSON.parse(localStorage.getItem('userObj'))
    }
    return this.userObject;
  }

}
