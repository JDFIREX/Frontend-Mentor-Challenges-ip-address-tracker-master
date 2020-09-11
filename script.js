let Address = document.querySelector("#Address")
let Location = document.querySelector("#Location")
let Timezone = document.querySelector("#Timezone")
let ISP = document.querySelector("#ISP")

window.addEventListener('onload', checkLocalIp(ip = 0,first = true))
//  local ip

function checkLocalIp(ip,first){
        
        let fetchurl = "";
        first ? fetchurl = `http://ip-api.com/json/?fields=66846719` : fetchurl = `http://ip-api.com/json/${ip}?fields=66846719` 
        
        fetch(fetchurl)
        .then( reponse => reponse.json())
        .then( result =>{
                if(result.status == "fail"){
                        alert(result.message)
                        window.location.reload()
                }else{

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

                        let lat = result.lat
                        let lon = result.lon;
                        map(lat,lon)

                        if(!first){
                                return 1;
                        }
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
let searching = false;

submit.addEventListener('click', () => setIp(input))

function setIp(input){
        let value  = input.value;
        if(searching == false){
                searching = true;
                let finish = checkLocalIp(value,first = false);
                finish == 1 ? searching = false : null;
        }
}
