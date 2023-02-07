import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {
    if( mongoConnection.isConnected ){
        console.log('ya estanamos conectados');
        return;
    }

    if( mongoose.connections.length > 0 ){
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if( mongoConnection.isConnected === 1 ){
            console.log('Usando conexion anterior');
            return;
        }

        await mongoose.disconnect();
    }
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URL || '');
    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB',process.env.MONGO_URL);
    
}

export const disconnect = async() => {

    if( process.env.NODE_ENV == 'development') return;
    if( mongoConnection.isConnected === 0 ) return;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconectado de MongoDB');
    
}