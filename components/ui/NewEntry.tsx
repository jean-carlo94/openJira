import React, { ChangeEvent, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { useEntries } from '@Entryproviders';
import { useUI } from '@UIproviders';

export const NewEntry = () => {

    const [inputValue, setinputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { isAddEntry, setEntryAction } = useUI();
    const { addNewEntry } = useEntries();

    const handleChangue = (event: ChangeEvent<HTMLInputElement>) => {
        setinputValue(event.target.value);
    }

    const handleSave = () => {
        if(inputValue.length === 0) return;
        
        addNewEntry(inputValue);
        setTouched(false);
        setinputValue('');
    }

  return (
    <Box sx={{ mb: 2, px: 2}}>

        {
            isAddEntry ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{mt: 2, mb: 1}}
                        placeholder='Nueva Entrada'
                        multiline
                        label='Nuenva Entrada'
                        helperText='Ingrese Valor'
                        error={ inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ handleChangue }
                        onBlur={ () => setTouched(true) }
                    />
                    
                    <Box display='flex' justifyContent='space-between'>

                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={ <CancelOutlinedIcon /> }
                            onClick={() => setEntryAction(false)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={ <DataSaverOnOutlinedIcon /> }
                            onClick={ handleSave }
                        >
                            Guardar
                        </Button>

                    </Box>
                </>
            ) : (
                <Button
                    startIcon={<AddCircleOutlinedIcon/>}
                    fullWidth
                    variant='outlined'
                    onClick={() => setEntryAction(true)}
                >
                    Agregar Tarea
                </Button>
            )
        }
    </Box>
  )
}
