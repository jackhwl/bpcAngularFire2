import { Component, OnInit} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Misc } from '../core/models';
import { EnvService, UserService, MenuService } from '../core/services';

@Component({
  selector: 'bc-header',  
  styleUrls: [ './header.component.css' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private userSVC: UserService, private menuSVC: MenuService, private sanitizer: DomSanitizer) {}

  public ngOnInit() {

  }


}
