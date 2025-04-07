// server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import Dish from './src/model/dishObj.js';

dotenv.config(); // load env variables from .env file into process.env

try {
  console.log('Connecting to MongoDB...');
  await connectDB(); // connect to the database
  console.log('Connected to MongoDB!');
} catch (err) {
  console.error('❌ DB connection failed:', err.message);
  process.exit(1); // stops app if failed!
}

const app = express();
const PORT = process.env.PORT || 5000;

 // path for incoming files
const __filename = fileURLToPath(import.meta.url); //meta:url: gives url to the current file, turn tht url into path.
const __dirname = path.dirname(__filename); //gets folder of that file & dirname is now the path to the folder.

 // Serve files fr. public folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API route
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find(); // find all dishes in the database
    if (!dishes || dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


// node src/server.js
//http://localhost:5000