const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
// Connection URI
const uri = process.env.MONGODB_URI;


let client = null;

const connectToDb = async () => {
  // connection already established
  if(!client) {
    // Create a new MongoClient

    // Connect to the MongoDB server
    client = await new MongoClient(uri).connect()
  };

  return client;
}


module.exports = connectToDb;
