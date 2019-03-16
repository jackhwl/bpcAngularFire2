import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../../core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Misc } from '../../core/models';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls:['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
    editorForm: FormGroup;
    theUser: string;
    headerChoice: string = '';
    misc: Misc;
    //misc$: FirebaseObjectObservable<Misc>;
    
    constructor(  private menuAdminSVC: MenuAdminService, private menuSVC: MenuService, private userSVC: UserService, private router: Router ) {}

    ngOnInit(): void {
        this.editorForm = new FormGroup({
            editContent: new FormControl(),
            'editor': new FormControl(null)
        });
        this.menuSVC.setTopNav('admin', null);
        this.getMisc();
    }

    chooseMode(mode: string){
        const content = mode === 'header' ? this.misc.header.content : this.misc.footer.content; //this.menuSVC.misc.footer.content;
        this.editorForm.controls.editContent.setValue(content);
        this.headerChoice = mode;
    }

    updateMisc() {
        if (this.headerChoice) {
            this.menuAdminSVC.editMisc(this.headerChoice, this.editorForm.controls.editContent.value);
        }
        this.headerChoice = '';
    }

    getMisc(): any {
        this.menuSVC.getMisc().subscribe(data=> this.misc=data);
      }
    
    // logout(){
    //     this.userSVC.logout();
    //     this.router.navigate(['']);
    // }
 }