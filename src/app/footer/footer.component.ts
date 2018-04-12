import { Component, OnInit} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Misc } from '../core/models';
import { Store } from '@ngrx/store';
import { AppState } from '../core/models/app-state';
import { Observable } from 'rxjs/Observable';
import * as miscActions from './../actions/misc.actions';

@Component({
  selector: 'bc-footer',  
  styleUrls: [ './footer.component.css' ],
  templateUrl: './footer.component.html'
})

export class FooterComponent implements OnInit {
  misc$: Observable<Misc>;
  constructor(private store: Store<AppState>, private sanitizer: DomSanitizer) {
    this.misc$ = this.store.select(state => state.misc);
  }

  ngOnInit() {
    this.getMisc();
  }

  getMisc() {
    this.store.dispatch(new miscActions.LoadMiscAction());
  }

}
