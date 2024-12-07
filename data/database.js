const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI; // This will be available after dotenv loads
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set!");
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  database = client.db();
  console.log("Connected to MongoDB Atlas!");
}

function getDb() {
  if (!database) {
    throw new Error("You must connect first!");
  }
  return database;
}

module.exports = {
  connectToDatabase,
  getDb,
};
