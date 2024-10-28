import { DatabaseConnectionError } from '@abijobportal/common';
import mongoose from 'mongoose';
import { appConfig } from './appConfig';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(appConfig.MONGO_URL_PAYMENT);
        console.log('payment service connected to mongodb...');
    } catch (error) {
        console.error('payment service mongodb connection failed!!!!', error);
        throw new DatabaseConnectionError();
    }
};

export { connectDB };
