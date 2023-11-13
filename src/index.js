const express = require("express");
const bodyParser = require('body-parser');
const connectToDb = require("../db/connection");

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Node js running on your machine now");
});

app.post("/add/volunteer", async (req, res) => {
    const { body } = req;
    console.log(body);
    const client = await connectToDb();
    // Specify the database and collection
    const database = client.db('Volunteer-Match');
    const collection = database.collection('Volunteer');
   
    // Insert the document into the collection
    const result = await collection.insertOne(body, (err, result) => {
      if (err) {
        console.error('Error inserting document:', err);
      } else {
        console.log('Document inserted successfully');
      }
    });
    res.send({
      status: 201,
      ...result
    });
});

app.post("/add/ngo", async (req, res) => {
  const { body } = req;
  console.log(body);
  const client = await connectToDb();
  // Specify the database and collection
  const database = client.db('Volunteer-Match');
  const collection = database.collection('NGO');
 
  // Insert the document into the collection
  const result = await collection.insertOne(body, (err, result) => {
    if (err) {
      console.error('Error inserting document:', err);
    } else {
      console.log('Document inserted successfully');
    }
  });
  res.send({
    status: 201,
    ...result
  });
});

app.listen(8080, () => {
  console.log("Server started on port: ", 8080);
});
