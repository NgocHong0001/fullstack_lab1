import dotenv from 'dotenv';
import { connectDB } from '../../config/db.js';
import Dish from './dishObj.js';

dotenv.config();

const dishesData = [
  {
    id: 1,
    name: "Pho",
    ingredients: ["rice noodles", "beef", "herbs", "onion"],
    preparationSteps: "Simmer broth, soak noodles, assemble bowl.",
    cookingTime: 60,
    origin: "Vietnam",
    spiceLevel: "Medium"
  },
  {
    id: 2,
    name: "Spaghetti Bolognese",
    ingredients: ["pasta", "ground beef", "tomato sauce"],
    preparationSteps: "Boil pasta, cook sauce, combine.",
    cookingTime: 30,
    origin: "Italy",
    difficulty: "Easy"
  },
  {
    id: 3,
    name: "Sushi",
    ingredients: ["rice", "nori", "salmon"],
    preparationSteps: "Prepare rice, assemble with fillings, roll and slice.",
    cookingTime: 50,
    origin: "Japan",
    servings: 2
  },
  {
    id: 4,
    name: "Tacos",
    ingredients: ["tortillas", "beef", "lettuce", "cheese"],
    preparationSteps: "Cook beef, prepare toppings, assemble tacos.",
    cookingTime: 20,
    origin: "Mexico",
    spiceLevel: "High"
  },
  {
    id: 5,
    name: "Ratatouille",
    ingredients: ["eggplant", "zucchini", "tomato", "bell pepper"],
    preparationSteps: "Slice vegetables, layer in pan, bake.",
    cookingTime: 45,
    origin: "France",
    difficulty: "Medium"
  }
];

const insertDishes = async () => {
  try {
    await connectDB(); // Connect via db.js

    const insertedDishes = await Dish.insertMany(dishesData, {ordered: false}); // insert, if some fail continue with the rest.
    insertedDishes.forEach((dish) => {
      console.log(`✅ Inserted: ${dish.name}`);
    });
    
  } catch (error) {
    console.error("❌ Some dishes could not be inserted:");
    if (error.writeErrors) {
      error.writeErrors.forEach((err) => {
        console.error(`- ❌ Failed to insert: ${err.err.op.name}`); // name of the dish that failed to insert
        console.error(`  ↳ Reason: ${err.err.errmsg || err.err.message}`); // error message & reason for failure
      });
    } else {
      console.error("Unexpected error:", error.message); // handle other errors
    }
  } finally {
    process.exit(); // end script after insertion
  }
};

insertDishes(); //to run this script: node src/model/preInsert.js