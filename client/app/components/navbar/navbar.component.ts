import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  allNav = [
    {
      routerLink: "/contact",
      text: "Contact Us"
    },
    {
      routerLink: "/courses",
      text: "Manage Course"
    },
    {
      routerLink: "/chapter",
      text: "Manage Chapter"
    },
    {
      routerLink: "/blog",
      text: "Manage Blog"
    },
    {
      routerLink: "/blogs",
      text: "Blogs"
    },
    {
      routerLink: "/contact",
      text: "contact us"
    },
    {
      routerLink: "/register",
      text: "Registration"
    },
    {
      routerLink: "/Contact",
      text: "contact us"
    }
  ]
}
