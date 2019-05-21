import { Component, OnInit, OnChanges } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import * as firebase from 'firebase';

import { filter } from 'rxjs/operators';
import { Blog } from '../core/models';

@Component({
    selector: 'blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.css']
})

export class BlogDetailComponent implements OnInit, OnChanges {
    singlePost: Blog;
    postTitle: string;
    //@Input() id;

    constructor( private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer ){
      route.params.subscribe(val => {
        // put the code from `ngOnInit` here
        //console.log('cons: init');
        this.postTitle = this.route.snapshot.params['title'].replace(/-/g, ' ');
        this.getSingle(this.postTitle);
      });
    }

    ngOnInit(){
      // console.log('init');
      //   this.postTitle = this.route.snapshot.params['title'].replace(/-/g, ' ');
      //   this.getSingle(this.postTitle);
    }
    ngOnChanges(){
      console.log('changed');
      this.postTitle = this.route.snapshot.params['title'].replace(/-/g, ' ');
      this.getSingle(this.postTitle);
    }

    getSingle(title: string){
      //console.log('title=',title);
        let dbRef = firebase.database().ref('blogPosts');
        dbRef.orderByChild('title')
            .equalTo(title)
            .once('value')
            .then((snapshot)=>{
                let tmp = snapshot.val();
                //console.log('tmp=', tmp);
                let transform = Object.keys(tmp).map(key => tmp[key]);
                let title = transform[0].title;
                let content = transform[0].content;
                let imgTitle = transform[0].imgTitle;
                let img = transform[0].img;
                let ontop = transform[0].ontop;
                let author = transform[0].author;
                let enable = transform[0].enable;
                let order = transform[0].order;
                let createDate = transform[0].createDate;
                let modifiedDate = transform[0].modifiedDate;

                this.singlePost = {
                  title,
                   content, imgTitle, img, ontop, author, order, enable, createDate, modifiedDate
                };

            })
    }
}
