import { Injectable } from '@angular/core';
import { MenuService } from '../core/services';
import { Effect, Actions } from '@ngrx/effects';
import * as miscActions from './../actions/misc.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class MiscEffects {

    constructor(private menuSVC: MenuService, private actions$: Actions) { }

    @Effect() loadMisc$ = this.actions$
        .ofType(miscActions.LOAD_MISC)
        .switchMap(() => this.menuSVC.getMisc()
            .map(misc => (new miscActions.LoadMiscSuccessAction(misc)))
        )
}