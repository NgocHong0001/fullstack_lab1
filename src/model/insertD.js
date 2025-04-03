// insertD.js
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.CONNECTION_URL;
const client = new MongoClient(uri);

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

async function run() {
  try {
    await client.connect();
    const db = client.db("lab1");
    const dish = db.collection("dish");

    //const result = await dish.insertMany(dishesData); check if this is connected to mongodb atlas

    dishesData.forEach((dish) => {
      console.log(`✅ Inserted ${dish.name} successfully!`);
    });
  } catch (error) {
    console.error("❌ Error inserting dishes:", error);
  } finally {
    await client.close();
  }
}

run(); //to run this script: node src/model/insertD.js