import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';// Import the mongoose-sequence plugin, for auto incr. id field

const AutoIncrement = mongooseSequence(mongoose);

const dishSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Auto-incremented field
  name: String,
  ingredients: [String],
  preparationSteps: String,
  cookingTime: Number,
  origin: String,
  spiceLevel: String,        
});

// Auto-increment `id` field
dishSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Dish = mongoose.model('Dish', dishSchema); // Create a model called Dish using the schema dishSchema, mongoose auto-pluralize & lowecase the model name to dishes in lab1.

export default Dish;