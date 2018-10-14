import { Component, OnInit } from '@angular/core';
import { Blog } from '../../services/blog-services/blog.model';
import { BlogService } from '../../services/blog-services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(public blogService: BlogService) { }
blogList;
  ngOnInit() {
    this.getAllBlogList();
    this.getAllBlogCategory();
    localStorage.removeItem("isReload");
  }

  getAllBlogList(){

    this.blogService.getBlogList().subscribe((res) => {
      this.blogList = res as Blog[]});
    }

    categoryList;
    getAllBlogCategory(){
      this.categoryList = this.blogService.getBlogCategory();
   
    }
    
    selectCategory;

    loadBlogsAsPerCat(CategoryName){
     // this.selectCategory=CategoryName;
      this.blogService.getBlogsAsPerCategory(CategoryName).subscribe((res) => {
        this.blogList = res as Blog[]
           
console.log(this.blogList);
      });
   
        
      }
    
    
    
}

