import { Injectable } from '@angular/core';
import { MenuService } from '../core/services';
import { Effect, Actions } from '@ngrx/effects';
import * as menuActions from './../actions/menu.actions';
import { map, switchMap} from 'rxjs/operators'

@Injectable()
export class MenuEffects {

    constructor(private menuSVC: MenuService, private actions$: Actions) { }

    @Effect() loadMenus$ = this.actions$
        .ofType(menuActions.LOAD_MENUS)
        .switchMap(() => {
                this.menuSVC.setTopNav('home'); 
                return this.menuSVC.getMenus()
                    .map(menus => (new menuActions.LoadMenusSuccessAction(menus)))
            }
        )
}