const express = require("express");
const router = express.Router();
const controller = require("../controllers/RecipeController");

router.get("/recipes", controller.getAll);
router.get("/recipes/search", controller.search);

module.exports = router;
