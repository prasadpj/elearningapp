import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  selectedBlog: Blog;
  blogList : Blog[];
 ddlCategory=[ 
    { CategoryName: 'C#'},
    { CategoryName: 'Asp.Net'},
    { CategoryName: 'Phython'},
    { CategoryName: 'R'},
    { CategoryName: 'Machine Learning'},
  ];
  private url = 'http://localhost:3000/Blog';
  private uploadUrl = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) { }

  postBlog(blog: Blog) {
    return this.http.post(this.url, blog);
  }

  getBlogList() {
    return this.http.get(this.url);
  }


   getBlogsAsPerCategory(CategoryName:  string){
   
    return this.http.get(this.url +'/byCategory'+ `/${CategoryName}`);
   }
   
  singleBlog(_id: string) {
    return this.http.get(this.url + `/${_id}`);
  }
  putBlog(blog: Blog) {
    return this.http.put(this.url + `/${blog._id}`, blog);
  }

  deleteBlog(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

  uploadBlogImages(formData : any) {
    return this.http.post('http://localhost:3000/upload', formData)
  }

 

  getBlogCategory(){
    return this.ddlCategory;
  }
 
}
