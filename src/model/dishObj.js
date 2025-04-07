import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  id: Number,
  name: String,
  ingredients: [String],
  preparationSteps: String,
  cookingTime: Number,
  origin: String,
  spiceLevel: String,    
  servings: Number,       
  difficulty: String        
});

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;