mapboxgl.accessToken = 'pk.eyJ1IjoidXB0b24zMyIsImEiOiJjbGdjZGYxZjUwMW52M2xwY2tqbnQxb3VtIn0.kwrf2PNrfHFdvpflNBj7ow';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [0, 0],
    zoom: 10,
    projection: 'globe',
    pitch: 0,
    center: [-74.00214, 40.71882]
});


map.on('load', function () {

    // Add Tree info from NYC Open Data 2015 Tree Census

    map.addSource('redbud', {
        type: 'geojson',
        data: redbud
    })

    map.addLayer({
        id: 'circle-redbud',
        type: 'circle',
        source: 'redbud',
        paint: {
            'circle-color': '#de50c1',
            'circle-radius': 2,
            'circle-opacity': .8
        }
    })

    map.addSource('crabapple', {
        type: 'geojson',
        data: crabapple
    })

    map.addLayer({
        id: 'circle-crabapple',
        type: 'circle',
        source: 'crabapple',
        paint: {
            'circle-color': '#a8324e',
            'circle-radius': 2,
            'circle-opacity': .8
        }
    })

    map.addSource('magnolia', {
        type: 'geojson',
        data: magnolia
    })

    map.addLayer({
        id: 'circle-magnolia',
        type: 'circle',
        source: 'magnolia',
        paint: {
            'circle-color': '#aa42f5',
            'circle-radius': 2,
            'circle-opacity': .8
        }
    })
})

//create filter

map.on('idle', () => {

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['circle-redbud', 'circle-crabapple', 'circle-magnolia'];
     
    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
    // Skip layers that already have a button set up.
    if (document.getElementById(id)) {//create filter


    continue;
    }
     
    // Create a link.
    const link = document.createElement('a');
    link.id = id;
    link.href = '#';
    link.textContent = id;
    link.className = 'active';
     
    // Show or hide layer when the toggle is clicked.
    link.onclick = function (e) {
    const clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();
     
    const visibility = map.getLayoutProperty(
    clickedLayer,
    'visibility'
    );
     
    // Toggle layer visibility by changing the layout object's visibility property.
    if (visibility === 'visible') {
    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    this.className = '';
    } else {
    this.className = 'active';
    map.setLayoutProperty(
    clickedLayer,
    'visibility',
    'visible'
    );
    }
    };
     
    const layers = document.getElementById('menu');
    layers.appendChild(link);
    }
    });