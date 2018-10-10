import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CoursesService } from '../../services/courses/courses.service';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { Chapter } from '../../services/chapter-services/chapter.model';

import { Course } from '../../services/course-services/course.model';
import { CourseService } from '../../services/course-services/course.service';
import { TopicService } from '../../services/topic-service/topic.service';
import { Topic } from '../../services/topic-service/topic.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private route: ActivatedRoute, public chapterService: ChapterService, public courseService: CourseService, public topicService: TopicService) { }

  courseId: string;
  ngOnInit() {
    this.route.queryParams
      .filter(params => params.course)
      .subscribe(params => {
        this.courseId = params.course;
      });
    this.getSingleCourseDetail(this.courseId);
    //this.loadSingleChapterList(this.courseId);
    this.getTopicList(this.courseId);
  }
  chapterList;

  loadSingleChapterList(courseId) {
    this.chapterService.getChapterListById(courseId).subscribe((res) => {
      this.chapterList = res as Chapter[];

    });

  }

  courseDetail;
  getSingleCourseDetail(courseId) {
    this.courseService.getCourseDetail(courseId).subscribe((res) => {
      this.courseDetail = res as Course[];

    });

  }
  topicList;
  selectChap;

  // getTopicList(obj){
  //   this.selectChap=obj;
  //   this.topicService.getTopicListByChapterId(this.selectChap['_id']).subscribe((res) => {
  //     this.topicList = res as Topic[];
  //     console.log(this.topicList);
  //   });
  // }

  getTopicList(courseId) {
    this.chapterService.getTopicListByChapter(courseId).subscribe((res) => {
      this.chapterList = res as Chapter[]
    });

  }

  setIcon(obj) {
    if (obj == "" || obj == null) {
      return "fa fa-file-alt";
    } else {
      return "fa fa-video";
    }
  }

}
