const rp = require('request-promise');
const querystring = require('querystring');
const axios = require('axios');

module.exports = (app) => {

  app.get('/api/search', async (req, res) => {
    const uri = 'https://api.yelp.com/v3/businesses/search';

    let config = {
      headers: {
        Authorization: `Bearer ${process.env.YELP_KEY}`
      }
    }

    let options = {
      location: req.query.location,
      term: req.query.term
    }
    
    let qs = querystring.stringify(options)
    let url = `${uri}?${qs}`;

    let data = await axios.get(url, config);
    res.send(data.data);
  });
  
  app.get('/api/detail/:yelpId', async (req, res) => {
    const options = {
      method: 'GET',
      uri: `https://api.yelp.com/v3/businesses/${req.params.yelpId}`,
      headers: { Authorization: `Bearer ${process.env.YELP_KEY}` },
    };
  
    const data = await rp(options);
    const results = JSON.parse(data);
    res.send({data: results});
  });
}