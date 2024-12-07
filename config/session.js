const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.MONGODB_URI, // Use environment variable for MongoDB URI
    databaseName: "furnitify",
    collection: "sessions",
  });

  store.on("error", function (error) {
    console.error("Session store error:", error);
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SESSION_SECRET || "default-secret", // Use environment variable for session secret
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    },
  };
}

module.exports = createSessionConfig;
