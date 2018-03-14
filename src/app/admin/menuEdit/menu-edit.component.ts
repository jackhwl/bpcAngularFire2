import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Menu } from '../../core/models/menu';

@Component({
    selector: 'edit-menu',
    templateUrl: '/menu-edit.component.html'
})

export class MenuEditComponent implements OnInit{
    name: string;
    order: number;
    enable: boolean;
    @Input() menuData: any;
    @Input() menu: Menu;
    constructor( private menuAdminSVC: MenuAdminService, private router: Router ){}

    // fileLoad($event: any) {
    //     let myReader:FileReader = new FileReader();
    //     let file:File = $event.target.files[0];
    //     this.imgTitle = file.name;
    //     myReader.readAsDataURL(file);

    //     myReader.onload = (e: any) => {
    //         this.imageSRC = e.target.result;
    //     }
    // }

    ngOnInit(){

    }

    updateMenu(menu: Menu) {
        if (this.menuData.addMode) {
            this.menuAdminSVC.createSubMenu(this.menuData.parentId, menu);;
        } else {
            this.menuAdminSVC.editSubMenu(this.menuData.parentId, menu);
        }
        this.menuData.menuChoice = '';
    }

    cancel() {
        this.menuData.menuChoice = '';
    }
}