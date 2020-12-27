const request = require('postman-request');

const forecast = (lat,long,callback)=>{
    const url ="http://api.weatherstack.com/current?access_key=0dfdfb258004b7c18047b3d8f89a20bb&query="+lat+","+long+"&unit=m";

    request({url,json:true},(error,{body})=>{

    if (error) {
        callback("UNABLE TO CONENCT TO WEATHER SERVICES",undefined);
        
    }

    else if(body.error){
        callback("UNABLE TO FIND THE LOCATION",undefined);
        
    }   
    else{
        callback(undefined, {
            description: body.current.weather_descriptions[0],
            temprature:body.current.temperature,
            feelsLike:body.current.feelslike,
            body,
            icon: body.current.weather_icons[0],
            humidity: body.current.humidity
        });
        }
        
        
    });
};

    

module.exports=forecast;