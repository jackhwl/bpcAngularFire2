import { Component, OnInit} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Misc } from '../core/models';
import { EnvService, UserService, MenuService } from '../core/services';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'bc-header',  
  styleUrls: [ './header.component.css' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  misc$: FirebaseObjectObservable<Misc>;
  
  constructor(private userSVC: UserService, private menuSVC: MenuService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getMisc();
  }

  getMisc(): any {
    this.misc$ = this.menuSVC.getMisc();
  }

}
