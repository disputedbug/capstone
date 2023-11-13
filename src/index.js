const express = require("express");
const bodyParser = require('body-parser');
const connectToDb = require("../db/connection");

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Node js running on your machine now");
});

app.get('/find/vol-ngo', async (req, res) => {
    const client = await connectToDb();
    // Specify the database and collection
    const database = client.db('Volunteer-Match');
    const volunteerColl = database.collection('Volunteer');
    const volDocs = await volunteerColl.find({});

    const volunteers = [];
    for await (const doc of volDocs) {
        volunteers.push(doc);
    }

    const ngoColl = database.collection('NGO');
    const ngoDocs = await ngoColl.find({});

    const ngos = [];
    for await (const doc of ngoDocs) {
        ngos.push(doc);
    }

    const result = [];

    ngos.forEach(ngo => {
        const { FieldOfInterest: ngoField, VolunteerDays: ngoDay } = ngo;
        const volunteerResult = [];
        volunteers.forEach(volunteer => {
            const { FieldOfInterest: volField, VolunteerDays: volDay } = volunteer;
            if(ngoField === volField && ngoDay === volDay) volunteerResult.push(volunteer)
        })
        result.push({
            ...ngo,
            volunteers: volunteerResult
        })
    })

    res.send(result);
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
