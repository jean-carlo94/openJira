import React, { DragEvent, FC, useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './'
import { EntryEstatus } from '@interfaces'
import { useEntries } from '@Entryproviders';
import { useUI } from '../../context/ui/UIProvider';

import styles from '../../styles/EntryList.module.css';

interface Props {
    status: EntryEstatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useEntries();
    const { isDragging, setDragging } = useUI();
    const entriesByStatus = useMemo(() => entries!.filter( entry => entry.status === status ), [entries, status])

    const handleAllowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }
    const handleDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('id');
        const entry = entries!.find( entry => entry._id === id)!;
        entry.status = status;
        updateEntry(entry);
        setDragging(false)
    }

  return (
    //TODO:  hacer drop
    <div
        onDrop={handleDropEntry}
        onDragOver={handleAllowDrop}
        className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: 1 }}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                {
                    entriesByStatus.map(entry => (
                        <EntryCard key={ entry._id } entry={ entry }/>
                    ))
                }
            </List>
        </Paper>
    </div>
  )
} 