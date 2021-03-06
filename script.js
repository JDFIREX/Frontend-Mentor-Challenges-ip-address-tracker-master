let Address = document.querySelector("#Address")
let Location = document.querySelector("#Location")
let Timezone = document.querySelector("#Timezone")
let ISPelement = document.querySelector("#ISP")

window.addEventListener('onload', checkLocalIp("https://geo.ipify.org/api/v1?apiKey=at_a2km93nsey9gJpgeNW8aTVAwW5QuR"))


// ip

function checkLocalIp(ip){
         
        fetch(ip)
        .then( reponse => reponse.json())
        .catch(function(err) {
                alert(err)
                alert("turn of addblocker")
            })
        .then( result =>{
                if(result.status == "fail"){
                        alert(result.message)
                }else{
                        Address.innerHTML = result.ip;
                        Location.innerHTML = result.location.city;
                        Timezone.innerHTML = `UTC ${result.location.timezone}`;
                        ISPelement.innerHTML = result.isp;

                        let lat = result.location.lat;
                        let lon = result.location.lng;
                        map(lat,lon)
                } 
        })

}



// mapbox

function map(lat,lon){
        mapboxgl.accessToken = 'pk.eyJ1IjoiamRmaXJleCIsImEiOiJja2JmZXBhY3QwdWw2MnNxZTlnY2N1ZDM4In0.Q34Lq3f1apoEpcn8teup1w';
        var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                zoom: 13,
                center: [lon,lat]
        });
        var marker = new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);
 
        var layerList = document.getElementById('menu');
        var inputs = layerList.getElementsByTagName('input');
        
        function switchLayer(layer) {
                var layerId = layer.target.id;
                map.setStyle('mapbox://styles/mapbox/' + layerId);
        }
        
        for (var i = 0; i < inputs.length; i++) {
                inputs[i].onclick = switchLayer;
        }
}
// set ip 

let submit = document.querySelector('#submit')
let input = document.querySelector('#search');

submit.addEventListener('click', () => setIp(input))

function setIp(input){
        let value  = input.value;
        checkLocalIp(`https://geo.ipify.org/api/v1?apiKey=at_a2km93nsey9gJpgeNW8aTVAwW5QuR&domain=${value}`);
}
