const express = require('express');
const cors = require('cors')
const fs = require("fs");

const app = express();
const port = 5000;

const whiteList = ['http://localhost:8080','http://localhost:8081'];

// It allows api requests that may come from Vue.js application
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials:true,
    optionSuccessStatus:200
}
// parse requests of content-type - application/json
app.use(express.json());

// Base route of the API
app.get('/', (req, res) => {
    console.log("Hello World")
    res.send('hello world!');
});

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','POST')
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept')
    express.json()
    next()
    cors()
})

// Dummy calculation function to give result for the getCalculation API Request
// It gets 6 properties and apply a calculation. Then return a result to the getCalculation route controller
function calculation(x,y,majorAxis,minorAxis,segmentsX,segmentsY){

    let result = segmentsX*(x+y)-segmentsY*(majorAxis-minorAxis)
    return result;

}

// It handles /getCalculation API request that come from Vue.js application.
// It gets request parameters and with the above function send a final result to the frontend application.
// Also it stores the current and previous results in a JSON file that locates at /data folder
app.route('/getCalculation').post( (req, res) => {
    //console.log(req.body)

    // API request parameters
    let x= req.body.x;
    let y=req.body.y;
    let majorAxis=req.body.majorAxis;
    let minorAxis=req.body.minorAxis;
    let segmentsX=req.body.segmentsX;
    let segmentsY=req.body.segmentsY;

    let calculatedValue = calculation(x,y,majorAxis,minorAxis,segmentsX,segmentsY)

    // This variable creates an object that will be stored at /data/result.json file
    // It has route parameters and final result
    let newFileResult = {
        x:x,
        y:y,
        majorAxis:majorAxis,
        minorAxis:minorAxis,
        segmentsX:segmentsX,
        segmentsY:segmentsY,
        calculatedValue:calculatedValue
    }

    // Reading current JSON file to add new data at the end of the file.
    let file = fs.readFileSync("data/results.json");

    // Parsing the file, to add new data
    let myObject = JSON.parse(file);

    // It adds new data to the end of the list
    myObject.push(newFileResult)

    // It turns back to the original format of file to store
    let data2 = JSON.stringify(myObject)
    //console.log(data2)

    // It writes the new version of file to the related location
    fs.writeFile("data/results.json",data2,(err)=>{
        if(err){
            console.log("Veri kaydedilemedi");
        }
        else{
            console.log("Veri kaydı başarıyla tamamlandı.")
        }
    })

    // It sends the final calculation value to the Vue.js application.
    res.status(200).send(calculatedValue.toString());
});

app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
});