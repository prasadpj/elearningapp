import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DomSanitizer } from '@angular/platform-browser';
import { Chapter } from '../../services/chapter-services/chapter.model';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { CourseService } from '../../services/course-services/course.service';
import { TopicService } from '../../services/topic-service/topic.service';
declare var $ :any;
@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
 
  styleUrls: ['./single-topic.component.css']
})

export class SingleTopicComponent implements OnInit  {
  @Input('title') title: string;
  isExpanded: boolean;

  VideoUrl;
  courseId;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, public chapterService: ChapterService, public courseService: CourseService, public topicService: TopicService) { 
  }
  ngOnInit() {
    this.route.queryParams
    .filter(params => params.VideoURL)
    .subscribe(params => {
      this.VideoUrl = params.VideoURL;
      this.courseId = params.courseId;
      this.VideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.VideoUrl);
     
    });
    this.getTopicList(this.courseId);
  }
  chapterList;
  getTopicList(courseId){
    this.chapterService.getTopicListByChapter(courseId).subscribe((res) => {
      this.chapterList = res as Chapter[]});
  }
  
  isExpand: boolean= false;
  toggle(obj) {
   
    
    if(this.isExpanded == null  || this.isExpand== false){
      this.isExpanded = !this.isExpanded;
      this.isExpanded = obj;
     this.isExpand=true;
     
     return
    }else{
      this.isExpand=false;
      
      this.isExpanded = !this.isExpanded;
    }
   
   
    

   
  }
  
  ngAfterViewInit() {
    // Your jQuery code goes here
    // $('#yourElement').text("Hello! ^_^");
    // $(function(){

    //   $('#slide-submenu').on('click',function() {			        
    //         $(this).closest('.list-group').fadeOut('slide',function(){
    //           $('.mini-submenu').fadeIn();	
    //         });
            
    //       });
    
    //   $('.mini-submenu').on('click',function(){		
    //         $(this).next('.list-group').toggle('slide');
    //         $('.mini-submenu').hide();
    //   })
    // })

    $(function(){

      $('#slide-submenu').on('click',function() {			        
            $(this).closest('.list-group').fadeOut('slide',function(){
              $('.mini-submenu').fadeIn();	
            });
            
          });
 
        
    
      $('.mini-submenu').on('click',function(){		
            $(this).next('.list-group').toggle('slide');
            $('.mini-submenu').hide();
      })
    })
  }
  
  setIcon(obj) {
    if(obj == "" || obj == null) {
      return "fa fa-file-alt";
    } else {
      return "fa fa-video";
    }
  }
 
}
