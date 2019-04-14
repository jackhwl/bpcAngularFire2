import { Component, OnInit} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
//import * as firebase from 'firebase';
// import { Blog } from '../admin/adminShared/blog';
import { EnvService, BlogService } from '../services';
import { Menu, Blog } from '../models';

//import { AppState } from '../app.service';
// import { Title } from './title';
// import { XLargeDirective } from './x-large';

//import { filter } from 'rxjs/operators';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'side-bar',  // <side-bar></side-bar>

  styleUrls: [ './sidebar.component.css' ],

  templateUrl: './sidebar.component.html'
})
export class SideBarComponent implements OnInit {
  constructor(private blogSVC: BlogService, private route: ActivatedRoute, private router: Router, public envSvc: EnvService, private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    this.blogSVC.setBlog();
  }

  changeRoute(blog) {
    this.router.navigate(['./blog', blog.title.replace(/ /g, '-')]);
    //this.router.navigateByUrl('./blog/'+blog.title.replace(/ /g, '-'));
  }
}
