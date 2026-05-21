const cameraGrid =
document.getElementById("cameraGrid");

const cameras = [

  {
    name:"Camera 1",
    status:"ONLINE"
  },

  {
    name:"Camera 2",
    status:"ONLINE"
  },

  {
    name:"Camera 3",
    status:"OFFLINE"
  }

];

cameras.forEach(cam=>{

  cameraGrid.innerHTML += `

    <div class="camera">

      <h3>${cam.name}</h3>

      <p>${cam.status}</p>

    </div>

  `;
function showCameras() {
    // Sembunyikan bagian lain
    document.getElementById('main-dashboard-content').style.display = 'none';
    document.getElementById('history-section').style.display = 'none';
    
    // Tampilkan hanya kamera
    document.getElementById('camera-section').style.display = 'block';
    
    // Opsional: Hilangkan margin atas agar kamera naik ke paling atas
    document.getElementById('camera-section').style.marginTop = '0';
}

function showDashboard() {
    // Tampilkan semuanya kembali untuk mode Dashboard utama
    document.getElementById('main-dashboard-content').style.display = 'block';
    document.getElementById('history-section').style.display = 'block';
    document.getElementById('camera-section').style.display = 'block';

});