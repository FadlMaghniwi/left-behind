// NASA Trek map tiles (real NASA imagery: LRO for the Moon, Viking for Mars)
const TILES = {
  Moon: "https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
  Mars: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg"
};

// EPSG4326 = a simple lat/lon grid, which is how NASA Trek cuts its tiles
const map = L.map("map", { crs: L.CRS.EPSG4326, minZoom: 0, maxZoom: 7 });
const markers = L.layerGroup().addTo(map);
let baseLayer = null;
let objects = [];

function showCard(o) {
  document.getElementById("card").innerHTML = `
    <h2>${o.name}</h2>
    <p class="story">${o.story || "<em>Story coming soon…</em>"}</p>
    <ul>
      <li><b>Launched:</b> ${o.launched}</li>
      ${o.arrived ? `<li><b>Arrived:</b> ${o.arrived}</li>` : ""}
      <li><b>Mass:</b> ${o.mass_kg} kg</li>
      <li><b>Status:</b> ${o.status}</li>
    </ul>
    <p><b>Science it made possible:</b> ${o.science}</p>
    <p class="source">Source: <a href="${o.source_url}" target="_blank" rel="noopener">NASA</a></p>`;
}

function showBody(body) {
  document.querySelectorAll("nav button")
    .forEach(b => b.classList.toggle("active", b.dataset.body === body));
  const items = objects.filter(o => o.body === body);
  const mapDiv = document.getElementById("map");
  const deepDiv = document.getElementById("deep");
  document.getElementById("card").textContent = "Click a marker to hear its story.";

  if (body === "Deep space") {            // no map out there, just a list
    mapDiv.hidden = true;
    deepDiv.hidden = false;
    deepDiv.innerHTML = items
      .map(o => `<button class="deep-item" data-id="${o.id}">🛰️ ${o.name}</button>`).join("");
    deepDiv.querySelectorAll("button").forEach(btn =>
      btn.onclick = () => showCard(objects.find(o => o.id === btn.dataset.id)));
    return;
  }

  deepDiv.hidden = true;
  mapDiv.hidden = false;
  if (baseLayer) map.removeLayer(baseLayer);
  baseLayer = L.tileLayer(TILES[body], {
    tileSize: 256, noWrap: true,
    attribution: "Imagery: NASA Moon Trek / Mars Trek"
  }).addTo(map);
  markers.clearLayers();
  items.forEach(o => L.marker([o.lat, o.lon]).addTo(markers).on("click", () => showCard(o)));
  map.invalidateSize();                    // map was hidden: recompute its size
  map.setView([0, 0], 1);
}

document.querySelectorAll("nav button")
  .forEach(b => b.onclick = () => showBody(b.dataset.body));

fetch("data.json")
  .then(r => r.json())
  .then(data => { objects = data; showBody("Moon"); })
  .catch(err => {
    document.getElementById("card").textContent = "Could not load data.json: " + err;
  });