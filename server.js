const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){
    response.sendFile(__dirname+'/index.html');
});

app.post('/', function(request, res){
    let url = 'https://api.coindesk.com/v1/bpi/currentprice/euro.json';
    let currency = request.body.currency;
    console.log(currency);
    axios.get(url)
    .then(function(response){
        let rate;
        let code;
        if(currency === 'EUR'){
            rate = response.data.bpi.EUR.rate;
            code = response.data.bpi.EUR.code;
        } else {
            rate = response.data.bpi.USD.rate;
            code = response.data.bpi.USD.code;
        }
        let disclaimer = response.data.disclaimer;
        res.write(`<p> ${rate} ${code}</p>`);
        res.write(`<p>${disclaimer}</p>`);
        res.send();
    })
    .catch(function(error){

    });
    /*let num1 = Number(request.body.num1);
    let num2 = Number(request.body.num2);
    let result = num1 + num2;
    console.log(`${num1}+${num2}= ${result}`);
    response.send(`${num1}+${num2}= ${result}`);*/

});

app.listen(3000,()=>{
    console.log('Server is running on Port 3000.');
});