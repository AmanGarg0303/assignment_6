import connectToDb from "./config/db.js";
import Product from "./models/products.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Connect to Mongo Database
connectToDb().then();

// Read The JSON files
const products = JSON.parse(
  fs.readFileSync(new URL("data.json", import.meta.url))
);

// Import Sample Data In DB
const importData = async () => {
  try {
    await Product.create(products);
    console.log(`Data successfully imported`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log(`Data successfully deleted`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData().then();
} else if (process.argv[2] === "-d") {
  deleteData().then();
}
