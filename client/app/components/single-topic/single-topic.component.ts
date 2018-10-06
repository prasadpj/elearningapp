import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DomSanitizer } from '@angular/platform-browser';
import { Chapter } from '../../services/chapter-services/chapter.model';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { CourseService } from '../../services/course-services/course.service';
import { TopicService } from '../../services/topic-service/topic.service';

@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
 
  styleUrls: ['./single-topic.component.css']
})

export class SingleTopicComponent implements OnInit  {
  

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
  
 
 
}
