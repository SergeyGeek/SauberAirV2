const ESP_IP = "192.168.68.100"; // �������� �� IP ESP8266
let map;

document.getElementById("show-map-btn").addEventListener("click", () => {
  document.getElementById("map-container").classList.remove("hidden");
  if (!map) initMap();
});

document.getElementById("close-map-btn").addEventListener("click", () => {
  document.getElementById("map-container").classList.add("hidden");
});

function initMap() {
  map = L.map('map').setView([55.751244, 37.618423], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([55.751244, 37.618423]).addTo(map).bindPopup("������ BMP280");
}

async function updateSensorData() {
  try {
    const response = await fetch(`http://${ESP_IP}/data`);
    const data = await response.json();
    
    document.getElementById("temp").textContent = `${data.temp} �C`;
    document.getElementById("pressure").textContent = `${data.pressure} ���`;
    document.getElementById("altitude").textContent = `${data.altitude} �`;
  } catch (error) {
    console.error("������:", error);
  }
}

// ��������� ������ ������ 5 ������
updateSensorData();
setInterval(updateSensorData, 5000);

// PWA: ����������� Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}