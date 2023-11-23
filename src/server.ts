import { createServer } from 'http';
import app from './app';
import configs from './configs';
import mongoConnect from './db/db';

const main = () => {
  // create server
  const server = createServer(app);

  // database connection with mongoose(mongodb)
  mongoConnect();

  const { port } = configs;

  // listen server
  server.listen(port, () => {
    console.log(`Hello Boss! I am listening at http://localhost:${port}`);
  });
};

main();
