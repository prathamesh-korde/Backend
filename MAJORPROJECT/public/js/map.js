mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: 9
});

const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML("<p>Exact Location will be provided after booking</p>"))
    .addTo(map);
