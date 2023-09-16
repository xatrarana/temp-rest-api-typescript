import mongoose, { Connection } from 'mongoose';

const MONGO_URL =
"mongodb+srv://wolfie:4HCY3Co1BC5H4pU2@dbtestwolf.klctlej.mongodb.net/?retryWrites=true&w=majority";

function connectToDatabase(): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const db = mongoose.connection;

    db.on('error', (error: Error) => {
      console.error('MongoDB connection error:', error);
      reject(error); // Reject the promise on error
    });

    db.on('disconnected', () => {
      console.log('Lost MongoDB connection. Reconnecting...');
      mongoose.connect(MONGO_URL);
    });

    db.on('connected', () => {
      console.log('Connected to MongoDB');
      resolve(db); // Resolve the promise on successful connection
    });

    // Initial connection attempt
    mongoose.connect(MONGO_URL);
  });
}

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
});

export default connectToDatabase;
