import { Component, OnInit} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
//import * as firebase from 'firebase';
// import { Blog } from '../admin/adminShared/blog';
import { EnvService, UserService, MenuService } from '../core/services';
import { Menu } from '../core/models/menu';

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
  selector: 'home',  // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  // providers: [
  //   Title
  // ],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './home.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  // public localState = { value: '' };
  // private menu;
  // private parentId: string;
  // private subMenu;
  //private isSubMenu = false;
  //nav: Menu[];
  //subNav: Menu[];
  //currentSubMenu: Menu;
  //blogPosts: Blog[];
  /**
   * TypeScript public modifiers
   */
  constructor(private userSVC: UserService, private menuSVC: MenuService, private route: ActivatedRoute, private router: Router, public envSvc: EnvService, private sanitizer: DomSanitizer) {}

  public ngOnInit() {
    this.menuSVC.getTopNav(this.route.snapshot.params['menu'], this.route.snapshot.params['sub']);
    this.menuSVC.getMisc();
  }

//   changeSubRoute(menu) {
//     //this._LoaderService.show(); 
//     //this will start the loader service.
//     //console.log(menu);
//     this.menuSVC.currentSubMenu = menu;
//     this.getContent(menu);
//     this.router.navigate(['/' + this.menuSVC.currentMenu.name.replace(' ', '-'), menu.name.replace(' ', '-')]); 
    
//     // you have to check this out by passing required route value.
//     // this line will redirect you to your destination. By reaching to destination you can close your loader service.
//     // please note this implementation may vary according to your routing code.
 
//  }

//  getContent(menu){
//   //let dbRef = firebase.database().ref('subMenu/').child(this.parentId).child('items').orderByChild('order');
//   //console.log(this.menu);
//   //console.log(this.menuSVC.topMenu);
//   //let currentMenu = this.menuSVC.topMenu.find(m=>m.name===this.menu);
//   //this.parentId = currentMenu.id;
//   if (menu && !menu.content) {
//       let contentRef = firebase.database().ref('content/').child(menu.id);
//       contentRef.once('value')
//           .then((snapshot) => {
//               let contents = snapshot.val();
//               menu.content = contents.content;
//               //console.log(this.menuSVC.currentSubMenu);
//       });
//   }
// } 

  // public submitState(value: string) {
  //   console.log('hello2 `Home` component:' +  this.menu);
  //   console.log('submitState', value);
  //   this.appState.set('value', value);
  //   this.localState.value = '';
  // }
  // public clicked() {
  //   console.log('hello2 `Home` component:' +  this.menu);
  //   console.log(this);
  // }

}
