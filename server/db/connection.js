const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
// Connection URI (Should get from process.env)
const uri = "mongodb+srv://disputedbug:sharma123@cluster0.viyrda9.mongodb.net/?retryWrites=true&w=majority";



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
