import { Component, OnInit } from '@angular/core';
import { UserService, MenuService, AuthService } from '../services';
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
    constructor(private userSVC: UserService, private authService: AuthService, private menuSVC: MenuService, private route: ActivatedRoute, private router: Router) {
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

    logout() {
        this.menuSVC.getContent(this.menuSVC.topMenu[0]);
        this.menuSVC.getContent(this.menuSVC.topMenu[0].items[0]);
        this.authService.logout();
    }

    changeSubRoute(menu, subMenu) {
        this.menuSVC.currentMenu = menu;
        this.menuSVC.currentSubMenu = subMenu;
        this.menuSVC.getContent(menu);
        this.menuSVC.getContent(subMenu);
        this.router.navigate(['/' + this.menuSVC.currentMenu.name.replace(/ /g, '-'), subMenu.name.replace(/ /g, '-')]); 
    }
}