import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
// import { EmbedVideoService } from 'ngx-embed-video';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
 
  styleUrls: ['./single-topic.component.css']
})

export class SingleTopicComponent implements OnInit  {
  

  VideoUrl;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
   
  }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.VideoURL)
    .subscribe(params => {
      this.VideoUrl = params.VideoURL;
  
      this.VideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.VideoUrl);
     
    });
  }

 
}
