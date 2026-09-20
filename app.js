const stations = [
  { id:1, name:"Puma - Great East Rd", area:"Lusaka", lat:-15.4067, lng:28.3215, petrol:33.47, diesel:29.98, status:"available", updated:"3 mins ago" },
  { id:2, name:"TotalEnergies - Cairo Rd", area:"Lusaka CBD", lat:-15.421, lng:28.283, petrol:33.47, diesel:29.98, status:"low", updated:"15 mins ago" },
  { id:3, name:"Mount Meru - Kafue Rd", area:"Lusaka", lat:-15.464, lng:28.281, petrol:33.47, diesel:29.98, status:"out", updated:"1 hour ago" },
  { id:4, name:"Engen - Manda Hill", area:"Lusaka", lat:-15.399, lng:28.309, petrol:33.47, diesel:29.98, status:"available", updated:"5 mins ago" },
  { id:5, name:"Rubble - Ndola", area:"Copperbelt", lat:-12.958, lng:28.636, petrol:33.47, diesel:29.98, status:"available", updated:"30 mins ago" }
];

let map = L.map('map').setView([-15.4167, 28.2833], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let markers = [];

function renderStations(filter='all'){
  const list = document.getElementById('station-list');
  list.innerHTML = '';
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  stations.filter(s => filter==='all' || s.status===filter).forEach(s => {
    // card
    list.innerHTML += `
      <div class="station-card">
        <h3>${s.name}</h3>
        <p>${s.area} • Petrol K${s.petrol} | Diesel K${s.diesel}</p>
        <p><span class="badge ${s.status}">${s.status.toUpperCase()}</span> • Updated ${s.updated}</p>
      </div>
    `;
    // map pin
    let color = s.status==='available'?'green': s.status==='low'?'orange':'red';
    let marker = L.circleMarker([s.lat, s.lng], {radius:8, color:color, fillColor:color, fillOpacity:0.8}).addTo(map)
      .bindPopup(`<b>${s.name}</b><br>${s.status}`);
    markers.push(marker);
  });
}

function filterFuel(type){
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  renderStations(type);
}

function submitReport(){
  const stationId = document.getElementById('report-station').value;
  const status = document.getElementById('report-status').value;
  const st = stations.find(s=>s.id==stationId);
  if(st){ st.status=status; st.updated="Just now"; renderStations('all'); alert(`Thanks! Updated ${st.name} to ${status}`); }
}

// init
const sel = document.getElementById('report-station');
stations.forEach(s=> sel.innerHTML+= `<option value="${s.id}">${s.name}</option>`);
renderStations();