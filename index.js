const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const axios = require("axios");
const https = require("https");
const app = express();

axios.defaults.timeout = 3000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });


app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.get('/', async (req, res) => {
    res.render('index');
})
app.post('/', (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.title}&units=metric&appid=4345889db319238c7449b7cf4d6c4b93`)
        .then(function (response) {
            res.render('des', { t: response.data });
        })
        .catch((err) => { res.render('index'); });
})
app.listen(3000, () => {
    console.log("listening on port 3000!")
})