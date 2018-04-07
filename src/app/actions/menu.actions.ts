import { Menu } from '../core/models';

export const LOAD_MENUS = 'LOAD_MENUS';
export const LOAD_MENUS_SUCCESS = 'LOAD_MENUS_SUCCESS';

export class LoadMenusAction {
    readonly type = LOAD_MENUS;
    constructor() {}
}

export class LoadMenusSuccessAction {
    readonly type = LOAD_MENUS_SUCCESS;
    constructor(public payload: Menu[]) {}
}

export type Action = LoadMenusAction | LoadMenusSuccessAction