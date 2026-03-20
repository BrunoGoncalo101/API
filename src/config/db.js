import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongoURI);
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

export default connectDB;




