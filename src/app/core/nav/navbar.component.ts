import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bc-nav-bar',    
    styleUrls: ['./navbar.component.css'],
    templateUrl: './navbar.component.html'
})

export class NavComponent implements OnInit {
    public bpcLogo = 'https://firebasestorage.googleapis.com/v0/b/bpcsite-277ab.appspot.com/o/images%2Fbpclogo.jpg?alt=media&token=8d39ab91-c0f8-43f6-b637-e43cf80117fa';
    //public url = 'http://localhost:3001';
    loggedInUser: string;
    // public userSVC: UserService; 
    // public menuSVC: MenuService;
    constructor(private userSVC: UserService, private menuSVC: MenuService, private route: ActivatedRoute, private router: Router) {
        //this.userSVC = userSV;
    }
  
    public ngOnInit() {
        //this.loggedInUser = this.userSVC.loggedInUser;
    }

    changeRoute(menu) {
        this.menuSVC.currentMenu = menu;
        this.menuSVC.currentSubMenu = null;
        this.menuSVC.getContent(menu);
        this.router.navigate(['./', menu.name.replace(/ /g, '-')]); 
    }

    adminRoute() {
        this.menuSVC.currentMenu = null;
        this.menuSVC.currentSubMenu = null;
        this.router.navigate(['./admin']); 
    }

    changeSubRoute(menu, subMenu) {
        this.menuSVC.currentMenu = menu;
        this.menuSVC.currentSubMenu = subMenu;
        this.menuSVC.getContent(menu);
        this.menuSVC.getContent(subMenu);
        this.router.navigate(['/' + this.menuSVC.currentMenu.name.replace(/ /g, '-'), subMenu.name.replace(/ /g, '-')]); 
    }
}