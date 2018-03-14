import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService,MenuService } from '../../core/services';
import { Menu } from '../../core/models/menu';

@Component({
    templateUrl: './login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent implements OnInit { 
    email: string;
    password1: string;
    constructor(private userSVC: UserService, private menuSVC: MenuService, private route: ActivatedRoute, private router: Router){}

    public ngOnInit() {
        if (!this.menuSVC.topMenu) {
           this.menuSVC.getTopNav('admin', null);
           this.menuSVC.getMisc();
        }
      }
    
    login(){
        this.userSVC.login(this.email, this.password1);
        this.userSVC.verifyUser();
    }

    signup(){
        this.router.navigate(['/admin/signup']);
    }

    cancel(){
        this.router.navigate(['']);
    }
}