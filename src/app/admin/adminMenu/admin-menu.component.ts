import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Misc } from '../../core/models';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls:['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
    theUser: string;
    headerChoice: string = '';
    content: string;
    misc: Misc;
    misc$: FirebaseObjectObservable<Misc>;
    
    constructor(  private menuAdminSVC: MenuAdminService, private menuSVC: MenuService, private userSVC: UserService, private router: Router ) {}

    ngOnInit(): void {
        this.menuSVC.getTopNav('admin', null);
        this.menuSVC.getMisc();
    }

    chooseMode(mode: string){
        //this.content = mode === 'header' ? this.misc$.header.content : this.menuSVC.misc.footer.content;
        this.headerChoice = mode;
    }

    updateMisc() {
        if (this.headerChoice) {
            this.menuAdminSVC.editMisc(this.headerChoice, this.content);
        }
        this.headerChoice = '';
    }

    getMisc(): any {
        this.misc$ = this.menuSVC.getMisc();
      }
    
    // logout(){
    //     this.userSVC.logout();
    //     this.router.navigate(['']);
    // }
 }