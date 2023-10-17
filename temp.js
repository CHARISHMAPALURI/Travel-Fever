const axios = require('axios');
const ejs = require('ejs');
const express = require('express');
const bp = require('body-parser');

const app = express();

app.set('viewengine','ejs');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get('/nearbyplaces',(req,res) => {
  res.render("nearbyplaces.ejs",{array:""});
});

app.post('/nearbyplaces', (req,res) => {
  async function request(){

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', 'las');
    encodedParams.set('language', 'en_US');

    const options = {
      method: 'POST',
      url: 'https://tourist-attraction.p.rapidapi.com/typeahead',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '3056cbb0dbmsh12baecee3c504e0p1798adjsnfd5769602191',
        'X-RapidAPI-Host': 'tourist-attraction.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.results.data);
    } catch (error) {
      console.error(error);
    }
  }
  request();
});

app.listen(5000,()=>{
    console.log("Server Started");
  });