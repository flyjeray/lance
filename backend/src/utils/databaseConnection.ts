import mongoose from 'mongoose';
import { config } from '../config';
import { setupAdmin } from './setupAdmin';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongodbUri);
    await setupAdmin();
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error('MongoDB disconnection error:', err);
  }
};
