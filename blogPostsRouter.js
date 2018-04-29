
// Imports
const express = require(`express`);
const bodyParser = require(`body-parser`);

const {BlogPosts} = require(`./model.js`);

// Further package accessibility
const app = express();
const jsonParser = bodyParser.json();

// Routing

app.get(`/`, (req, res) => {
    console.log(`We've reached the get route`);
    res.json({greeting: `hello`});
});