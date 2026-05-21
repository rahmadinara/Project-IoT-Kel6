function updateClockAndDate() {
  const clockElement = document.getElementById("clock");
  const dateElement = document.getElementById("current-date");
  const now = new Date();

  // Menampilkan Jam real-time (Format 24 Jam)
  if (clockElement) {
    clockElement.textContent = now.toLocaleTimeString('en-GB');
  }

  // Menampilkan Tanggal otomatis (Format: DD/MM/YYYY)
  if (dateElement) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    dateElement.textContent = now.toLocaleDateString('en-GB', options);
  }
}

// Jalankan fungsi saat script pertama kali dimuat
updateClockAndDate();
// Lakukan update setiap 1 detik (1000 milidetik)
setInterval(updateClockAndDate, 1000);