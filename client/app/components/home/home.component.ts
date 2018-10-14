import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog-services/blog.service';
import { Blog } from '../../services/blog-services/blog.model';
import { CourseService } from '../../services/course-services/course.service';
import { Course } from '../../services/course-services/course.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public blogService: BlogService, public courseService: CourseService) { }

  ngOnInit() {
    this.blogsList();
    this.coursesList();
  }

  blogList;
  courseList;

  blogsList() {
    this.blogList = this.blogService.getBlogList().subscribe((res) => {
      this.blogService.blogList = res as Blog[];
    });
  }

  coursesList() {
    this.courseService.getCourseList().subscribe((res) => {
      this.courseService.courseList = res as Course[];
    });
  }
}

