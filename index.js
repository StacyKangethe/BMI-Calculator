const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended:false});
const fs = require('fs');
const { platform } = require('os');
const { Cipher } = require('crypto');

fs.readFile('./bmi.json', 'utf-8', (err, jsonString) => {
    console.log(jsonString);
});

function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf-8' , (err, fileData) => {
        if (err) {
        return cb && cb(err);
        }
        try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
        } catch (error) {
        return cb && cb(err);
        }
    });
}
/*
const newObject = {
    name: 'Wanjiku',
    weight: 106,
    height: 67,
    bmi: 21
};

fs.writeFile('./newBmi.json', JSON.stringify(newObject, null, 2), err => {
    if (err) {
        console.log(err);
    } else {
        console.log('File successfully written');
    }
});
*/

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', function (request, response) {
    response.render('bmi_home');
});


app.post('/bmi-calculator', urlEncodedParser, function (request, response) {
    bmi = user_weight / (user_height * user_height);
    response.end('Thank you' + ' ' + request.body.user_name + 'Your BMI is  ' + request.body.bmi + '[weight]:' + request.body.user_weight + '[height]: ' + request.body.user_height);
});


app.listen(port);
console.log(`server listening on port ${port}`);

