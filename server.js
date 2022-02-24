require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(require("./src/routes/index"))
app.use( express.static('public') );

app.get('/about', (req, res) => {
    res.sendFile( __dirname + '/public/Sections/About.html')
});

app.get('/products', (req, res) => {
    res.sendFile( __dirname + '/public/Sections/Products.html')
});

app.get('/services', (req, res) => {
    res.sendFile( __dirname + '/public/Sections/Services.html')
});

app.get('/contact', (req, res) => {
    res.sendFile( __dirname + '/public/Sections/Contact.html')
});

app.listen(port, () => {
    console.log('Server on port 3500')
})