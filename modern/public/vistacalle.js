let panorama;

function initMap() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const berkeley = { lat: Number(urlParams.get('lat')), lng: Number(urlParams.get('lng')) };
  const sv = new google.maps.StreetViewService();
  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano")
  );
  // Set up the map.
  
  // Set the initial Street View camera to the center of the map
  sv.getPanorama({ location: berkeley, radius: 50 }).then(processSVData);
  // Look for a nearby Street View panorama when the map is clicked.
  // getPanorama will return the nearest pano when the given
  // radius is 50 meters or less.
  
}

function processSVData({ data }) {
  const location = data.location;
  
  panorama.setPano(location.pano);
  panorama.setPov({
    heading: 270,
    pitch: 0,
  });
  panorama.setVisible(true);
  
}