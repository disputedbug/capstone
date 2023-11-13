const express = require("express");
const bodyParser = require('body-parser');

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
    res.send(body);
});

app.listen(8080, () => {
    console.log("Server started on port: ", 8080);
});