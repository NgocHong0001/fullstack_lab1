import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  id: Number,
  name: String,
  ingredients: [String],
  preparationSteps: String,
  cookingTime: Number,
  origin: String,
  spiceLevel: String,        
});

const Dish = mongoose.model('Dish', dishSchema); // Create a model called Dish using the schema dishSchema, mongoose auto-pluralize & lowecase the model name to dishes in lab1.

export default Dish;