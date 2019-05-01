import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Blog } from '../models';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class BlogService {
  blogs: Blog[];
  hightlights: Blog[];
  blog$: Observable<Blog[]>;

  constructor(private db: AngularFireDatabase ) {
    this.blog$ = this.db.list('blogPosts');
  }

  getBlogs() {
    //this.setTopNav('home');
    //return Observable.of(this.topMenu);
    return this.blog$;
  }

  setBlog(){
    if (!this.blogs) {
        //let dbRef = this.menu$.$ref.orderByChild('order');
        let dbRef = this.db.list('blogPosts', {query: {orderByChild: 'order'}}).$ref;
        //.filter(subMenuKey => subMenuKey.name.toLowerCase() === 'join us').$ref;
        dbRef.once('value')
            .then((snapshot) => {
              let tmp: string[] = [], ontop: string[] = [];
              snapshot.forEach(function(childSnapshot){
                  let item = childSnapshot.val();
                  if (item.enable) {
                    if (item.ontop)
                      ontop.push(childSnapshot.val());
                    else
                      tmp.push(childSnapshot.val());
                  }
              });
              this.hightlights = Object.keys(ontop).map(key => ontop[key]);
              this.blogs = Object.keys(tmp).map(key => tmp[key]);
            });
    }
}
  // getPosts() {
  //   let dbRef = firebase.database().ref('blogPosts/');
  //   dbRef.once('value')
  //       .then((snapshot) => {
  //           let tmp: string[] = snapshot.val();
  //           this.blogPosts = Object.keys(tmp).map(key => tmp[key])
  //       });
  // }

}
