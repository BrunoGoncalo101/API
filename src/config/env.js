import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
};

module.exports = env;


