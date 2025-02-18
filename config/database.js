import mongoose from 'mongoose'

const mongoUrl = process.env.DBURL;

if (!mongoUrl) {
    throw new Error('MongoDB URL not found');
}

export async function connectToDatabase() {
    try {
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
}
