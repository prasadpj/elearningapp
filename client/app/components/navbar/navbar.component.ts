
import { Component, OnInit } from '@angular/core';
import { ClientRegisterService } from '../../services/client-service/client-register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {

  constructor(public clientRegisterService:ClientRegisterService ) { }
loggs;
  ngOnInit() {
  }
  allNav = [
    {
      routerLink: "/course",
      text: "Manage Course",
      IsClient: false
    },
    {
      routerLink: "/chapter",
      text: "Manage Chapter",
      IsClient: false
    },
    {
      routerLink: "/topic",
      text: "Manage Topic",
      IsClient: false
    },
    {
      routerLink: "/blog",
      text: "Manage Blog",
      IsClient: false
    },
    {
      routerLink: "/users",
      text: "Manage users",
      IsClient: false
    },
    {
      routerLink: "/home",
      text: "Home",
      IsClient: true
    },
    {
      routerLink: "/blogs",
      text: "Blogs",
      IsClient: true
    },
    
    {
      routerLink: "/login",
      text: "Login",
      IsClient: true
    },
    {
      routerLink: "/contact",
      text: "Contact Us",
      IsClient: true
    }
  ]


  adminNav = [
    
    {
      routerLink: "/course",
      text: "Manage Course",
      IsClient: false
    },
    {
      routerLink: "/chapter",
      text: "Manage Chapter",
      IsClient: false
    },
    {
      routerLink: "/topic",
      text: "Manage Topic",
      IsClient: false
    },
    {
      routerLink: "/blog",
      text: "Manage Blog",
      IsClient: false
    },
    {
      routerLink: "/users",
      text: "Manage users",
      IsClient: false
    }
  ]


  clientNav = [
    {
      routerLink: "/home",
      text: "Home",
      IsClient: true
    },
    {
      routerLink: "/blogs",
      text: "Blogs",
      IsClient: true
    },
    
    {
      routerLink: "/login",
      text: "Login",
      IsClient: true
    },
    {
      routerLink: "/contact",
      text: "Contact Us",
      IsClient: true
    }
  ]

  signout(){
    this.clientRegisterService.setUser(null);

  }
 

}
