const fs = require("fs");
const path = require("path");
const Recipe = require("../models/Recipe");

async function parseAndStoreJSON() {
  const dataPath = path.join(__dirname, "../data/recipe-data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const jsonData = JSON.parse(rawData);

  const recipesArray = Object.values(jsonData); // Fix: convert object to array

  if (!Array.isArray(recipesArray)) {
    throw new Error("Parsed data is not an array");
  }

  const cleaned = recipesArray.map((r) => ({
    title: r.title,
    cuisine: r.cuisine,
    rating: isNaN(r.rating) ? null : r.rating,
    prep_time: isNaN(r.prep_time) ? null : r.prep_time,
    cook_time: isNaN(r.cook_time) ? null : r.cook_time,
    total_time: isNaN(r.total_time) ? null : r.total_time,
    description: r.description,
    nutrients: r.nutrients || {},
    serves: r.serves,
  }));

  await Recipe.deleteMany({});
  await Recipe.insertMany(cleaned);
  console.log(`✅ Inserted ${cleaned.length} recipes into MongoDB.`);
}

module.exports = parseAndStoreJSON;
