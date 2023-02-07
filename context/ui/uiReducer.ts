import { UIState } from "./";

type UIActionType = 
| { type: '[UI] - Open_Sidebar' }
| { type: '[UI] - Close_Sidebar' }
| { type: '[UI] - Set_isAddEntry', payload: boolean }
| { type: '[UI] - Set_isDragging', payload: boolean }

export const uiReducer = ( state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case '[UI] - Open_Sidebar':
            return{
                ...state,
                sidemenuOpen:true,
            }
        case '[UI] - Close_Sidebar':
            return{
                ...state,
                sidemenuOpen:false,
            }
        case '[UI] - Set_isAddEntry':
            return{
                ...state,
                isAddEntry: action.payload,
            }
        case '[UI] - Set_isDragging':
            return{
                ...state,
                isDragging: action.payload,
            } 
        default:
            return state;
    }
};