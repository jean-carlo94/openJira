import React, { FC, DragEvent } from "react"
import { useRouter } from "next/router";

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { Entry } from "@interfaces"
import { useUI } from '../../context/ui/UIProvider';
import { dateFunctions } from "../../utils";

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { _id, description, status, createdAt } = entry;
    const router = useRouter();

    const { setDragging } = useUI();

    const handleDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('id', _id);
        setDragging(true);
    }

    const handleDragEnd = (event: DragEvent) => {
        setDragging(false);
    }

    const handleOnClick = () => {
        router.push(`/entries/${ entry._id }`);
    }

  return (
    <Card
        onClick={handleOnClick}
        sx={{marginBottom: 1}}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
            </CardContent>

            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant="body1">{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}
