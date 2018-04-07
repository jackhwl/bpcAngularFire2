import { Component, OnInit} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Misc } from '../core/models';
import { EnvService, UserService, MenuService } from '../core/services';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { AppState } from '../core/models/app-state';
import { Observable } from 'rxjs/Observable';
import * as miscActions from './../actions/misc.actions';

@Component({
  selector: 'bc-header',
  styleUrls: [ './header.component.css' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  misc$: Observable<Misc>;
  
  constructor(private store: Store<AppState>, private sanitizer: DomSanitizer
    //private userSVC: UserService, 
  ) {
    this.misc$ = this.store.select(state => state.misc);
  }

  ngOnInit() {
    this.getMisc();
  }

  getMisc() {
    this.store.dispatch(new miscActions.LoadMiscAction());
  }

}
