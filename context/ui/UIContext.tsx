import { createContext } from 'react';

interface ContextProps{
     sidemenuOpen?: boolean;
     isAddEntry?: boolean;
     isDragging?: boolean;

     // Methods
     closeSideMenu: () => void;
     openSideMenu: () => void;
     setEntryAction: (isAdding : boolean) => void;
     setDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext( {} as ContextProps );