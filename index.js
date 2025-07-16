const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");
const parseAndStoreJSON = require("./utils/jsonParser");

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  //   await parseAndStoreJSON();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
