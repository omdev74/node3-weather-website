const path = require('path');
const express = require('express');

const hbs = require('hbs');
const forecast = require('../src/utils/forecast');
const geocode =require('../src/utils/geocode');

const app = express();
const port = process.env.PORT || 3000
//defining path
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setting up handle bars

app.set('view engine', 'hbs')//tell express which templating engine
app.set("views",viewsPath)//telling the path
hbs.registerPartials(partialsPath)


//setting up static directory to serve
app.use(express.static(publicDirectory));


app.get('',(req,res)=>{     
    res.render('index',{    
        title:"Home",
        name:" omdev"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: " omdev"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: " omdev",
        helpText:"This is some lovely help" 
    });
})

//weather end point
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            errorMessage:"Please provide some address as query string"
        })
    }
    else{
        geocode(req.query.address, (error, { lat, long, location }={}) => {

            if (error) {
                // return console.log(chalk.red.inverse(error));
                return res.send({
                    errorMessage: error
                })
            }
            //chaining
            forecast(lat, long, (error, fdata) => {
                if (error) {
                    // return console.log(chalk.red.inverse(error));
                    return res.send({
                        errorMessage: error
                    })
                }
                // console.log(location);
                // console.log(fdata);
                
                res.send({
                    location,
                    fdata,
                })
            })

        });

    }

    // const weather={
    //     forecast:"Cloudy",
    //     location:"Delhi",
    //     address:req.query.address,
    // }
    // res.send(weather);

})

app.get("/test",(req,res)=>{
    if (!req.query.address) {
        return res.send({
            errorMessage: "Please provide some address as query string"
        })
    }
    else {
        geocode(req.query.address, (error, { lat, long, location } = {}) => {

            if (error) {
                // return console.log(chalk.red.inverse(error));
                return res.send({
                    errorMessage: error
                })
            }
            //chaining
            forecast(lat, long, (error, fdata) => {
                if (error) {
                    // return console.log(chalk.red.inverse(error));
                    return res.send({
                        errorMessage: error
                    })
                }
                // console.log(location);
                // console.log(fdata);

                res.send({
                    location,
                    fdata,
                    icon:fdata.icon
                    
                })
            })

        });

    }

    // const weather={
    //     forecast:"Cloudy",
    //     location:"Delhi",
    //     address:req.query.address,
    // }
    // res.send(weather);

})  





app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        title: "404",
        name: " omdev",
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage:"Page not Found",
        title: "404",
        name: " omdev",
    })
})  

// app.listen(3000, () => {
//     console.log('server is up on port 3000 ');

app.listen(port, () => {
    console.log('server is up on port '+ port);

})
