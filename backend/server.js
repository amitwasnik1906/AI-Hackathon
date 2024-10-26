import app from "./src/app.js";
import dotenv from "dotenv";
import connectDatabase from "./src/config/database.js";

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({path: "src/config/config.env"});
}

connectDatabase();

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});