import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAdminService } from '../adminShared/menu-admin.service';
import { Menu } from '../../core/models/menu';

@Component({
    selector: 'add-menu',
    templateUrl: '/menu-add.component.html'
})

export class MenuAddComponent implements OnInit{
    name: string;
    content: string;
    order: number=0;
    enable: boolean=false;
    menu: Menu;
    @Input() parentId: string;

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
        // console.log('this.parentId=');
        // console.log(this.parentId);
    }

    createMenu() {
        this.menu = new Menu (
            this.name,
            this.order,
            this.enable
        );
        this.menu.content = this.content;
        if (this.parentId) {
            this.menuAdminSVC.createSubMenu(this.parentId, this.menu);
        } else {
            this.menuAdminSVC.createMenu(this.menu);
        }
        this.router.navigate(['/admin']);
    }

    cancel() {
        this.router.navigate(['/admin']);
    }
}