const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

require('dotenv').config();

app.get('/breaches', (req, res) => {
    const email = req.query.email;
    const API = `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`;
    console.log('in the API')
    axios.get(API, {
        headers: {
          'hibp-api-key': process.env.API_KEY
        }})
        .then(response => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                res.send(response.data)
            }).catch(err => {
                console.error('ERROR:', err)
                res.send(err);
            })
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));