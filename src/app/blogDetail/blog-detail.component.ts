import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from '../admin/adminShared/blog';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.css']
})

export class BlogDetailComponent implements OnChanges {
    singlePost: Blog;
    postTitle: string;
    @Input() id;
    
    constructor( private route: ActivatedRoute, private router: Router ){}

    ngOnChanges(){
        this.postTitle = this.id.replace('-', ' '); 
        this.getSingle(this.postTitle);
    }

    getSingle(id: string){
        let dbRef = firebase.database().ref('blogPosts');
        dbRef.orderByChild('title')
            .equalTo(id)
            .once('value')
            .then((snapshot)=>{
                let tmp = snapshot.val();
                let transform = Object.keys(tmp).map(key => tmp[key]);
                let title = transform[0].title;
                let content = transform[0].content;
                let imgTitle = transform[0].imgTitle;
                let img = transform[0].img;
                this.singlePost = new Blog(title, content, imgTitle, img);

            })
    }
}