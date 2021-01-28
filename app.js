const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

let localHost = '127.0.0.1';

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("Home");
});

app.get("/search", (req, res) => {
    res.render("Find");
});

app.get("/result", (req, res) => {
    let curr1 = req.query.curr;
    let curr2 = req.query.targ;
    let url = ` https://v6.exchangerate-api.com/v6/c146bcaf0e48acd30e012222/pair/${curr1}/${curr2}`;
    request(url, (error, response, body) => {
        if (!error && res.statusCode == 200) {
            let appData = JSON.parse(body);
            res.render("Result", { data: appData });
        }
    });
});

let port = process.env.PORT | 4000;

app.listen(port, localHost, () => {
    console.log(`App Running At Port ${port}.`);
});