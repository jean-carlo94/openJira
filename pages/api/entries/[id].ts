import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models'

type Data = 
| {message: string}
| IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;
    
    if( !mongoose.isValidObjectId( id ) ){
        return res.status(400).json({ message: 'El id no es valido ' + id })
    };

    switch ( req.method ) {
        case 'GET':
            return getEntry( req, res);  

        case 'PUT':
            return updateEntry( req, res);
        
        case 'DELETE':
            return deleteEntry( req, res);   
        
        default:
            return res.status(400).json({ message: 'Metodo no existe' })
    };
};
const getEntry = async( req:NextApiRequest, res:NextApiResponse ) => {

    const { id } = req.query;
    
    await db.connect();
    const entry = await Entry.findById( id );
    await db.disconnect();

    if( !entry ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID ' + id});
    };

    return res.status(200).json( entry );
};

const updateEntry = async( req:NextApiRequest, res:NextApiResponse ) => {

    const { id } = req.query;
    await db.connect();

    const entryToUpdate = await Entry.findById( id );
    if( !entryToUpdate ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID ' + id});
    };

    const { 
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updateEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updateEntry! );

    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({ ok: false, message: error.message});
        }
        return res.status(500).json({ ok: false, message: "Ha ocurrido un error"});
    } finally { 
        await db.disconnect();
    };
};

const deleteEntry = async( req:NextApiRequest, res:NextApiResponse ) => {
    const { id } = req.query;
    await db.connect();

    const entryToDeleted = await Entry.findById( id );

    if( !entryToDeleted ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID ' + id});
    };

    try {
        const entryDeleted = await Entry.findByIdAndDelete( id );
        await db.disconnect();
        res.status(200).json( entryDeleted! );

    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({ ok: false, message: error.message});
        }
        return res.status(500).json({ ok: false, message: "Ha ocurrido un error"});
    } finally { 
        await db.disconnect();
    };
}
