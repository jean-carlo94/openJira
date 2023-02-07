import React ,{ FC, useReducer, useContext } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState{
    children?: React.ReactNode;
    sidemenuOpen?: boolean;
    isAddEntry?: boolean;
    isDragging?: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddEntry: false,
    isDragging: false,
}

export const UIProvider: FC<UIState> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
   
    const openSideMenu = () => { dispatch({ type: '[UI] - Open_Sidebar' }) };
    const closeSideMenu = () => { dispatch({ type: '[UI] - Close_Sidebar' }) };
    const setEntryAction = ( isAdding : boolean ) => { dispatch({ type: '[UI] - Set_isAddEntry', payload: isAdding}) };
    const setDragging = ( isDragging : boolean ) => { dispatch({ type: '[UI] - Set_isDragging', payload: isDragging}) }

    const values = { 
                    ...state,
                    // Methods
                    closeSideMenu,
                    openSideMenu,
                    setEntryAction,
                    setDragging,
    };  

    return (
        <UIContext.Provider value={values}>
            { children }
        </UIContext.Provider>
    )
}

export const useUI = () => useContext(UIContext);