const express = require("express");
const bodyParser = require('body-parser');
const connectToDb = require("../db/connection");

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Node js running on your machine now");
});

app.post("/add/volunteer", (req, res) => {

});

app.post("/add/ngo", (req, res) => {
  const { body } = req;
  console.log(body);
  const client = connectToDb();
  // Specify the database and collection
  const database = client.db('Volunteer-Match');
  const collection = database.collection('NGO');
 
  // Insert the document into the collection
  collection.insertOne(body, (err, result) => {
    if (err) {
      console.error('Error inserting document:', err);
    } else {
      console.log('Document inserted successfully:', result.ops[0]);
    }
    res.send(body);
  });
});

app.listen(8080, () => {
  console.log("Server started on port: ", 8080);
});
