// Ganti bagian "YOUR_API_KEY" dengan API key Anda

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Pilih semua elemen HTML yang akan kita manipulasi
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherContainer = document.querySelector(".weather");

// Fungsi utama untuk mengambil dan menampilkan data cuaca
async function checkWeather(city) {
    // Kaizen: Cek jika input kota kosong
    if (!city) {
        alert("Silakan masukkan nama kota.");
        return; // Hentikan fungsi jika kota kosong
    }

    // Ambil data dari API
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    // Log data mentah ke console untuk inspeksi
    console.log(data);

    // ---- SEMUA LOGIKA TAMPILAN HARUS ADA DI SINI ----

    // Update elemen-elemen di HTML dengan data dari API
    tempElement.textContent = Math.round(data.main.temp) + "°C";
    cityElement.textContent = data.name;
    humidityElement.textContent = data.main.humidity + "%";
    windElement.textContent = data.wind.speed + " km/h";

    // Update ikon cuaca berdasarkan kondisi
    const iconCode = data.weather[0].icon;
// 2. Buat URL gambar ikon secara dinamis sesuai dokumentasi OpenWeatherMap
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Tampilkan kontainer cuaca yang tadinya tersembunyi
    weatherContainer.style.display = "block";
}


// ---- EVENT LISTENER (HANYA DITULIS SATU KALI) ----

// Event listener untuk tombol "Cari"
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Event listener untuk menekan "Enter" di kotak input
searchBox.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});