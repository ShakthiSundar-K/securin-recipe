const mongoose = require("mongoose");

const NutrientSchema = new mongoose.Schema(
  {
    calories: String,
    carbohydrateContent: String,
    cholesterolContent: String,
    fiberContent: String,
    proteinContent: String,
    saturatedFatContent: String,
    sodiumContent: String,
    sugarContent: String,
    fatContent: String,
  },
  { _id: false }
);

const RecipeSchema = new mongoose.Schema({
  title: String,
  cuisine: String,
  rating: { type: Number, default: null },
  prep_time: { type: Number, default: null },
  cook_time: { type: Number, default: null },
  total_time: { type: Number, default: null },
  description: String,
  nutrients: NutrientSchema,
  serves: String,
});

module.exports = mongoose.model("Recipe", RecipeSchema);
