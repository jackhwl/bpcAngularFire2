import * as menuActions from './../actions/menu.actions';

export function menuReducer(state = [], action: menuActions.Action) {
    switch (action.type) {
        case menuActions.LOAD_MENUS_SUCCESS:
            return action.payload
        default:
            return state
    }
}