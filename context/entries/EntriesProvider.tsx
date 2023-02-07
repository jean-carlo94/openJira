import React, { FC, useReducer, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { Entry } from '@interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../api'

export interface EntriesState{
    entries?: Entry[];
    children?: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
   entries: [],
}

export const EntriesProvider: FC<EntriesState> = ({ children }) => {

   const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
   const { enqueueSnackbar } = useSnackbar();
   const router = useRouter();

   const refreshEntries = async() => {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({type: '[Entry] - Refresh_Data', payload: data});
   };

   const addNewEntry = async( description: string ) => {
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({type: '[Entry] - Add_Entry', payload: data});
   };

   const updateEntry = async( {_id, description, status}: Entry, showSnackbar = false ) => {
      try {
         const { data: entry } = await entriesApi.put<Entry>(`/entries/${ _id }`, {description, status});
         dispatch({type : '[Entry] - Update_Entry', payload: entry});

         if(showSnackbar){
            enqueueSnackbar('Entrada actualizada', {
               variant: 'success',
               autoHideDuration: 1500,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right'
               }
            });
         };

      } catch (error) {
         console.log({ error })
      };
   };

   const deleteEntry = async( {_id, description, status}: Entry, showSnackbar = false ) => {
      try {
         const { data: entry } = await entriesApi.delete<Entry>(`/entries/${ _id }`); 
         refreshEntries();
         router.push('/');
         
      } catch (error) {
         console.log({ error });
      };
   };

   useEffect(() => {
      refreshEntries();
   }, []);
   
   const values = { 
            ...state,
            // Methods
            addNewEntry,
            updateEntry,
            deleteEntry,
        };  

   return (
       <EntriesContext.Provider value={values}>
          { children }
       </EntriesContext.Provider>
   )
}

export const useEntries = () => useContext(EntriesContext);