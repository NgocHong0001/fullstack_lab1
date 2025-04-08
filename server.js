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

app.use(express.json()); // Makes sure Express can read JSON data, req.body

 // path for incoming files
const __filename = fileURLToPath(import.meta.url); //meta:url: gives url to the current file, turn tht url into path.
const __dirname = path.dirname(__filename); //gets folder of that file & dirname is now the path to the folder.

 // Serve files fr. public folder
app.use(express.static(path.join(__dirname, 'public')));

// API route
//GET all dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find(); // find all dishes in the database
    if (!dishes || dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }
    res.json(dishes); // send the dishes as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes' });
  }
});

//GET dish by name
app.get('/api/dishes/:name', async (req, res) => {
  const { name } = req.params; // get the name from the URL parameter
  const dish = await Dish.findOne({ name });
  if (!dish) {
    return res.status(404).json({ message: `Dish '${name}' not found` });
  }
  res.json(dish);
});

//POST new dish
app.post('/api/dishes', async (req, res) => {
  const newDish = req.body; //user will send this data in the body of the request
  if (!newDish || !newDish.name) {
    return res.status(400).json({ message: 'Dish name is required' }); //400: bad request
  }

  const exists = await Dish.findOne({ name: newDish.name }); // check if dish already exists
  if (exists) {
    return res.status(409).json({ message: 'Dish already exists' }); //409: conflict with existing data
  }

  const created = await Dish.create(newDish); // create a new dish in the database
  if (!created) {
    return res.status(500).json({ message: 'Error creating dish' }); //500: internal server error, inc. something went wrong
  }
  res.status(201).json(created);
});

//PUT update dish by ID
app.put('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Dish.findOneAndUpdate(
    { id: Number(id) },    // using findOneAndUpdate to find the dish by id and update it instead of findByIdAndUpdate coz we would get a long string of id, not the number.
    req.body,
    { new: true } // return the updated document
  );

  if (!updated) {
    return res.status(404).json({ message: 'Dish not found' });
  }
  res.json(updated);
});

//DELETE dish by ID
app.delete('/api/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Dish.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: 'Dish not found' });
  }
  res.json({ message: `Dish '${deleted.name}' deleted` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// node src/server.js
//http://localhost:5000