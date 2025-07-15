const RecipeService = require("../services/RecipeService");

class RecipeController {
  constructor() {
    this.service = new RecipeService();
  }

  getAll = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const result = await this.service.getAllRecipes(
      Number(page),
      Number(limit)
    );
    res.json(result);
  };

  search = async (req, res) => {
    const result = await this.service.searchRecipes(req.query);
    res.json({ data: result });
  };
}

module.exports = new RecipeController();
