const ESP_IP = "192.168.68.100"; // Замените на IP ESP8266
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
  L.marker([55.751244, 37.618423]).addTo(map).bindPopup("Датчик BMP280");
}

async function updateSensorData() {
  try {
    const response = await fetch(`http://${ESP_IP}/data`);
    const data = await response.json();
    
    document.getElementById("temp").textContent = `${data.temp} °C`;
    document.getElementById("pressure").textContent = `${data.pressure} гПа`;
    document.getElementById("altitude").textContent = `${data.altitude} м`;
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

// Обновляем данные каждые 5 секунд
updateSensorData();
setInterval(updateSensorData, 5000);

// PWA: Регистрация Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}