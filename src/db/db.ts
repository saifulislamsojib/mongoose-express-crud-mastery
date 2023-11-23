import configs from '@/configs';
import { connect, connection } from 'mongoose';

// database connection with mongoose
const mongoConnect = async () => {
  try {
    await connect(configs.uri);
    console.log('Database successfully connected!');
  } catch (error) {
    console.log('Database connection error =', (error as Error).message);
  }
};

connection.on('disconnected', () => {
  console.log('Mongoose disconnected from Database');
});

process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});

export default mongoConnect;
