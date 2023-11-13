const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
// Connection URI
const uri = process.env.MONGODB_URI;


let client = null;

const connectToDb = () => {
  // connection already established
  if(!client) {
    // Create a new MongoClient
    client = new MongoClient(uri);

    // Connect to the MongoDB server
    client.connect(err => {
      if (err) {
        console.error('Error connecting to MongoDB:', err);
        return null;
      }
    });
  };

  return client;
}


module.exports = connectToDb;
