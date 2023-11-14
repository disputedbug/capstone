const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const connectToDb = require("../db/connection");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.listen(8080, "0.0.0.0", () => {
  console.log("serever is runing at port 8080");
});

app.get('/', (req, res) => {
  res.send("Node js running on your machine now");
});

app.get('/find/ngo-vol', async (req, res) => {
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
        const { fieldOfInterest: ngoField, volunteerDays: ngoDay } = ngo;
        const volunteerResult = [];
        volunteers.forEach(volunteer => {
            const { fieldOfInterest: volField, volunteerDays: volDay } = volunteer;
            if(ngoField === volField && ngoDay === volDay) volunteerResult.push(volunteer)
        })
        result.push({
            ...ngo,
            volunteers: volunteerResult
        })
    })

    res.send(result);
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

  volunteers.forEach(volunteer => {
      const { fieldOfInterest: volField, volunteerDays: volDay } = volunteer;
      const ngoResult = [];
      ngos.forEach(ngo => {
          const { fieldOfInterest: ngoField, volunteerDays: ngoDay } = ngo;
          if(ngoField === volField && ngoDay === volDay) ngoResult.push(ngo)
      })
      result.push({
          ...volunteer,
          ngos: ngoResult
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
