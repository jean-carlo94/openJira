
import React, { useState, ChangeEvent, useMemo, FC } from 'react';
import { GetServerSideProps } from 'next'

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from '@layouts';
import { Entry, EntryEstatus } from '@interfaces';
import { dbEntries } from '@database';
import { useEntries } from '@Entryproviders';
import { dateFunctions } from '@utils';

const validStatus: EntryEstatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
};

export const EntryPage:FC<Props> = ({ entry }) => {
    
    const { updateEntry, deleteEntry } = useEntries();
    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryEstatus>( entry.status as EntryEstatus );
    const [touched, setTouched] = useState(false);
    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const handleChangue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue( event.target.value );
    };

    const handleStatusChangue = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus( event.target.value as EntryEstatus );
    };

    const handleClickSave = () => {

        if( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        };
        
        updateEntry(updatedEntry, true);
    };

    const handleClickDelete = () => {
        deleteEntry(entry);
    }

  return (
    <Layout title={ inputValue.substring(0.20) }>
        <Grid
            container
            justifyContent={'center'}
            sx={{ marginTop: 2 }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={`Creada ${ dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                    />

                    <CardContent>
                        <TextField 
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            fullWidth
                            placeholder="Nueva Entrada"
                            autoFocus
                            multiline
                            label="Neva Entrada"
                            value={ inputValue }
                            onBlur={() => setTouched(true)}
                            onChange={ handleChangue }
                            helperText={ isNotValid && 'Ingrese un valor'}
                            error={ isNotValid }
                        />
                        <FormControl>
                          <FormLabel>Estado:</FormLabel>
                          <RadioGroup
                            row
                            value={ status }
                            onChange={ handleStatusChangue }
                          >
                            {
                                validStatus.map(option => (
                                    <FormControlLabel
                                        key={ option }
                                        value={ option }
                                        control={ <Radio/> }
                                        label={ capitalize(option) }
                                    />
                                ))
                            }
                          </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon />}
                            variant="contained"
                            fullWidth
                            onClick={ handleClickSave }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton
            sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }}
            onClick={ handleClickDelete }
        >
            <DeleteForeverOutlinedIcon />
        </IconButton>
    </Layout>
  )
};


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string };
    
    const entry = await dbEntries.getEntrybyId(id);

    if( !entry ){
        return {
            redirect:{
                destination:'/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}
export default EntryPage;
