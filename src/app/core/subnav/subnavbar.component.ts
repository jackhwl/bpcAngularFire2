import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
//import { AppState } from '../../app.service';
import * as firebase from 'firebase';
import { Menu } from '../models/menu';
import { UserService } from '../services';
import { MenuService } from '../services';

@Component({
    selector: 'bc-sub-nav-bar',
    templateUrl: './subnavbar.component.html'
})

export class SubNavComponent implements OnInit {
    subNav: Menu[];
    private parentId: string;
    private menu;

    constructor(private userSVC: UserService, private menuSVC: MenuService, private route: ActivatedRoute, private router: Router) {}
  
    public ngOnInit() {
      //console.log('Initial App State', this.appState.state);
      this.menu =  this.route.snapshot.params['menu'];
      //this.getNav();
    }

    changeRoute(menu) {
        //this._LoaderService.show(); 
        //this will start the loader service.
        //console.log(menu);
        this.menuSVC.currentSubMenu = menu;
        //this.getSubNav(menu);
        this.router.navigate(['./', menu.name.replace(' ', '-')]); 
        
        // you have to check this out by passing required route value.
        // this line will redirect you to your destination. By reaching to destination you can close your loader service.
        // please note this implementation may vary according to your routing code.
     
     }

}