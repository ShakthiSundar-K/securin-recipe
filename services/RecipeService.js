const Recipe = require("../models/Recipe");

class RecipeService {
  async getAllRecipes(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const total = await Recipe.countDocuments();
    const data = await Recipe.find()
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit);

    return { page, limit, total, data };
  }

  async searchRecipes(filters) {
    const query = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }
    if (filters.cuisine) query.cuisine = filters.cuisine;
    if (filters.rating) query.rating = this._parseOperator(filters.rating);
    if (filters.total_time)
      query.total_time = this._parseOperator(filters.total_time);
    if (filters.calories)
      query["nutrients.calories"] = this._parseOperator(filters.calories, true);

    return Recipe.fing(query);
  }

  _parseOperator(filter, isString = false) {
    const ops = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };
    const match = filter.match(/(>=|<=|>|<|=)(\d+)/);
    if (!match) {
      return {};
    }
    const op = ops[match[1]];
    const val = isString ? new RegExp(match[2]) : Number(match[2]);
    return { [op]: val };
  }
}

module.exports = RecipeService;
