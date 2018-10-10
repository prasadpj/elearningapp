import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ElearningApp';
  hideFooter = false;
  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe(() => {
      // console.log('this.router.url ', this.router.url)
      // if url contains home hide footer
      if (this.router.url.indexOf('singletopic') > -1) {
        this.hideFooter = true
      }else{
        this.hideFooter = false
      }
    })

  }
}
