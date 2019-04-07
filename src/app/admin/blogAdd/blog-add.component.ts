import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from 'src/app/core/models';


@Component({
    selector: 'add-blog',
    templateUrl: '/blog-add.component.html'
})

export class BlogAddComponent {
    imgTitle: string;
    imageSRC: string;
    postTitle: string;
    content: string;
    post: Blog;

    constructor( private blogAdminSVC: BlogAdminService, private router: Router ){}

    fileLoad($event: any) {
        let myReader:FileReader = new FileReader();
        let file:File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
    }

    createPost() {
        this.post =  {
          title:  this.postTitle,
          content:  this.content,
          imgTitle:  this.imgTitle,
          img:  this.imageSRC ? this.imageSRC.substring(23) : null
        };
        this.blogAdminSVC.createPost(this.post);
        //alert(`${this.postTitle} added to posts`);
        this.router.navigate(['/blog-admin']);
    }

    cancel() {
        this.router.navigate(['/blog-admin']);
    }
}
