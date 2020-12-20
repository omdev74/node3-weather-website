// const request = require('postman-request');




// const geocode = (address, callback) => {
//     const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib21kZXY3NCIsImEiOiJja2ZrdnNndGMwdjd3MnRxaDJ5ZHIyb2o5In0.7sEk4numLft_fs8XpbD-mQ&limit=1"
//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('unable to connect location services!', undefined);
//         }
//         else if (response.body.features.length === 0) {
//             callback('unable to find location ', undefined)
//         }
//         else {
//             callback(undefined, {
//                 lat: response.body.features[0].center[1],
//                 long: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name,
//             })
//         }
//     })
// }

// module.exports=geocode;

const request = require('postman-request');




const geocode = (address, callback) => {
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib21kZXY3NCIsImEiOiJja2ZrdnNndGMwdjd3MnRxaDJ5ZHIyb2o5In0.7sEk4numLft_fs8XpbD-mQ&limit=1"
    request({url, json: true }, (error, {body}) => {
        if (error) {
            return callback('unable to connect location services!', undefined);
        }
        else if (body.features.length === 0) {
            callback('unable to find location ', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;