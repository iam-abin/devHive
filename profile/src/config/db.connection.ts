import { DatabaseConnectionError } from '@abijobportal/common';
import mongoose from 'mongoose';
import { appConfig } from './appConfig';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(appConfig.MONGO_URL_PROFILE);
        console.log('profile service connected to mongodb...');
    } catch (error) {
        console.error('profile service mongodb connection failed!!!!', error);
        throw new DatabaseConnectionError();
    }
};
export { connectDB };
