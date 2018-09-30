import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientRegister } from './client-register.model';

@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  selectedRegisterClinet: ClientRegister;
 

  private url = 'http://localhost:3000/ClientRegister';
  constructor(private http : HttpClient) { }

  postClientRegister(clientRegister: ClientRegister){
    return this.http.post(this.url,clientRegister);
  }

  getClientRegisterList(){
   return this.http.get(this.url);
   }

  putClientRegister(clientRegister: ClientRegister) {
    return this.http.put(this.url + `/${clientRegister._id}`, clientRegister);
  }

  deleteClientRegister(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

  getSingleLogin(clientRegister: ClientRegister){
    return this.http.post(this.url+'/byEmail',clientRegister);
    }
}
