import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Misc } from '../../core/models';

@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls:['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
    theUser: string;
    headerChoice: string = '';
    content: string;
    misc: Misc;

    constructor(  private menuAdminSVC: MenuAdminService, private menuSVC: MenuService, private userSVC: UserService, private router: Router ) {}

    ngOnInit(): void {
        //this.theUser = this.userSVC.loggedInUser;
        //this.menuSVC.currentMenu = menu;
    }

    chooseMode(mode: string){
        this.content = mode === 'header' ? this.menuSVC.misc.header.content : this.menuSVC.misc.footer.content;
        this.headerChoice = mode;
    }

    updateMisc() {
        if (this.headerChoice) {
            this.menuAdminSVC.editMisc(this.headerChoice, this.content);
        }
        this.headerChoice = '';
    }

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }
 }