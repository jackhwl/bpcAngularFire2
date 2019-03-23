import { Component, OnInit } from '@angular/core';
import { UserService, MenuService } from '../../core/services';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Menu } from '../../core/models';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: '/menu-admin.component.html',
    styleUrls: ['./menu-admin.component.css']
})

export class MenuAdminComponent implements OnInit {
    editorForm: FormGroup;
    theUser: string;
    menuChoice: string;
    nav: Menu[];
    subNav: Menu[];
    formDisplay: boolean = true;
    singleMenu: Menu;
    parentId: string;

    constructor(private userSVC: UserService, private router: Router, private menuSVC: MenuService, private menuAdminSVC: MenuAdminService, private fb: FormBuilder){}

    logout(){
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string, id: string){
        this.menuChoice = mode;
        this.parentId = id;
    }

    ngOnInit(){
        // this.editorForm = new FormGroup({
        //     editName: new FormControl(),
        //     editContent: new FormControl(),
        //     editOrder: new FormControl(),
        //     editEnable: new FormControl()
        // });
        this.editorForm = this.fb.group({
            editName: '',
            editContent: '',
            editOrder: '',
            editEnable: ''
        })
        this.theUser = this.userSVC.loggedInUser;
        this.getNav();
    }

    getNav(){
        let dbRef = firebase.database().ref('menu/').orderByChild('order');
        // dbRef.on('value', (snapshot) => {
        //     let tmp: string[] = snapshot.val();
        //     this.nav = Object.keys(tmp).map(key => tmp[key])
        // });
        dbRef.once('value')
            .then((snapshot) => {
                // let tmp: string[] = snapshot.val();
                // console.log(tmp);
                //this.nav = Object.keys(tmp).map(key => tmp[key])
                let tmp: string[] = [];
                snapshot.forEach(function(childSnapshot){
                    tmp.push(childSnapshot.val());
                })
                this.nav = Object.keys(tmp).map(key => tmp[key]);
        });
        // let key = this.nav[0].id;
        // let homeRef = dbRef.child(key);
        // homeRef.once('value')
        //     .then((snap) => {
        //         let tmp: string[] = snap.val();
        //         this.subNav = Object.keys(tmp).map(key => tmp[key])
        //     });

    }

    editNav(theMenu: Menu) {
        this.singleMenu = theMenu;
        this.menuAdminSVC.setForm(this.singleMenu, this.editorForm);
        this.formDisplay = false;
    }

    cancelEdit() {
        this.formDisplay = true;
    }

    updateMenu(){
        this.singleMenu.name = this.editorForm.controls.editName.value;
        this.singleMenu.order = this.editorForm.controls.editOrder.value;
        this.singleMenu.enable = this.editorForm.controls.editEnable.value;
        this.singleMenu.content = this.editorForm.controls.editContent.value;
        this.menuAdminSVC.editMenu(this.singleMenu);
        this.formDisplay = true;
    }

    deleteNav(single: Menu){
        let verify = confirm(`Are you sure you want to delete this menu?`);
        if (verify == true) {
            this.menuAdminSVC.removeMenu(single);
            this.router.navigate(['/admin/']);
        } else {
            alert('Nothing deleted!');
        }
    }
}