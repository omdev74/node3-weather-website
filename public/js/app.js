// client side js running on the browser

const weatherForm = document.querySelector('form')//returns js representation of respective element
const search = document.querySelector('input')
const meassageOne = document.querySelector('#message-1')
const meassageTwo = document.querySelector('#message-2')
const icon = document.querySelector('#icon');

// meassageOne.textContent="for javascript";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();//prevents default page refreshing behviour
    console.log('testing')
    const locations = search.value;
    meassageOne.textContent = "Loading...";
    meassageTwo.textContent = "";
    icon.src = "";

    fetch("http://localhost:3000/weather?address="+locations).then((response) => {
        
        response.json().then((data) => {
            if (data.errorMessage) {
                // return console.log("Some error occured");
                meassageTwo.textContent = data.errorMessage;
            }
            else {
                
                console.log(data);
                console.log(data.fdata);    
                meassageOne.textContent = "Location: "+data.location ;
                meassageTwo.innerHTML = "Description:" + data.fdata.description + "<br>Temprature: " + data.fdata.temprature +"<br>FeelsLike: "+data.fdata.feelsLike;
                icon.src = data.fdata.icon;
                icon.style = "  ";

            }

        })

    })
    

})
