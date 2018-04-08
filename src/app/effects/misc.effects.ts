import { Injectable } from '@angular/core';
import { MenuService } from '../core/services';
import { Effect, Actions } from '@ngrx/effects';
import * as miscActions from './../actions/misc.actions';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MiscEffects {

    constructor(private menuSVC: MenuService, private actions$: Actions) { }

    @Effect() 
    loadMisc$ = this.actions$
        .ofType(miscActions.LOAD_MISC)
        .switchMap(() => this.menuSVC.getMisc()
            .map(misc => new miscActions.LoadMiscSuccessAction(misc))
            .catch(error => of(new miscActions.LoadMiscFailAction(error)))
        )
}