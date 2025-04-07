// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js'; // import the connectDB function

dotenv.config(); // load env variables from .env file into process.env

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB(); // connect to the database
    console.log('Connected to MongoDB!');
    const app = express();
    const PORT = process.env.PORT || 5000;

    // path for incoming files
    const __filename = fileURLToPath(import.meta.url); //meta:url: gives url to the current file, turn tht url into path.
    const __dirname = path.dirname(__filename); //gets folder of that file & dirname is now the path to the folder.

    // Serve files fr. public folder
    app.use(express.static(path.join(__dirname, 'public')));

    /*app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });*/

    /*app.get('/', (req, res) => {
      res.send('Home route reached');
    }); */

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  }catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure 1, 0 is success
  }
  
}

startServer(); // start the server

// node src/server.js
//http://localhost:5000