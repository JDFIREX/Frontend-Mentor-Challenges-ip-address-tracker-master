let Address = document.querySelector("#Address")
let Location = document.querySelector("#Location")
let Timezone = document.querySelector("#Timezone")
let ISP = document.querySelector("#ISP")

window.addEventListener('onload', checkLocalIp(Address))
//  local ip

function checkLocalIp(Address){
        fetch(`http://ip-api.com/json/?fields=66846719`)
        .then( reponse => reponse.json())
        .then( result =>{
                console.log(result)
                Address.innerHTML = result.query;
                Location.innerHTML = result.city;
                let offset = result.offset / 3600;
                offset > 0 ? offset = `+${offset}` : offset = offset
                Timezone.innerHTML = `UTC ${offset}`;
                ISP.innerHTML = result.isp
        })
}



// mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiamRmaXJleCIsImEiOiJja2JmZXBhY3QwdWw2MnNxZTlnY2N1ZDM4In0.Q34Lq3f1apoEpcn8teup1w';
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11'
});

//  ipapi
function getGeo(ip) {
        // fetch(`http://ip-api.com/json/${ip}?fields=66846719`)
        fetch(`http://ip-api.com/json/${ip}?fields=66846719`)
        .then( reponse => reponse.json())
        .then( result =>{
                if(result.status == "fail"){
                        alert(result.message)
                }else{
                        console.log(result)
                        Address.innerHTML = result.query;
                        Location.innerHTML = result.city;
                        if(typeof result.offset == "Number"){
                                let offset = result.offset / 3600;
                                offset > 0 ? offset = `+${offset}` : offset = offset
                                Timezone.innerHTML = `UTC ${offset}`;
                        }else{
                                Timezone.innerHTML = result.timezone
                        }
                        ISP.innerHTML = result.isp
                } 
        })
}


// set ip 

let submit = document.querySelector('#submit')
let input = document.querySelector('#search');
submit.addEventListener('click', () => setIp(input))

function setIp(input){
        let value  = input.value;
        getGeo(value);
}