/* =========================================
   1. NAVIGATION & SIDEBAR LOGIC
   ========================================= */
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Toggle Sidebar
hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('show');
});

// Close Sidebar via Overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('show');
});

// Fungsi Pindah Halaman (SPA)
function showPage(pageId) {
    // Sembunyikan semua section
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    // Nonaktifkan semua menu sidebar
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // Tampilkan halaman yang dipilih
    const activePage = document.getElementById(pageId);
    activePage.classList.add('active');
    
    // Aktifkan menu sidebar yang sesuai
    const menuId = 'menu-' + pageId.split('-')[1];
    document.getElementById(menuId).classList.add('active');
    
    // Update Judul di Header
    updateHeaderTitles(pageId);

    // LOGIK RE-RENDER: Pastikan chart muncul saat pindah halaman
    if (pageId === 'page-dashboard') {
        renderDashboardCharts();
    } else if (pageId === 'page-stats') {
        initFullStats();
    }
    
    // Tutup sidebar di mobile setelah klik
    sidebar.classList.remove('active');
    overlay.classList.remove('show');
}

function updateHeaderTitles(pageId) {
    const titles = {
        'page-dashboard': ['QC SUPERVISOR PANEL', 'Real-time Production Monitoring'],
        'page-camera': ['LIVE MONITORING', 'All System Camera Feeds'],
        'page-history': ['DATA ARCHIVE', 'Full Inspection History Log'],
        'page-stats': ['ANALYTICS', 'Detailed Production Statistics']
    };
    document.getElementById('page-title-tag').textContent = titles[pageId][0];
    document.getElementById('page-title-main').textContent = titles[pageId][1];
}

/* =========================================
   2. CHART ENGINE (DASHBOARD)
   ========================================= */
function renderDashboardCharts() {
    // --- Doughnut Chart ---
    const canvasDoughnut = document.getElementById('qualityDoughnut');
    if (canvasDoughnut) {
        const existD = Chart.getChart("qualityDoughnut");
        if (existD) existD.destroy(); // Bersihkan chart lama

        new Chart(canvasDoughnut.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Intact', 'Defect'],
                datasets: [{
                    data: [11980, 560],
                    backgroundColor: ['#7baedb', '#3d342e'],
                    borderWidth: 0,
                    cutout: '80%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
            }
        });
    }

    // --- Bar Chart (Rejection Reasons) ---
    const canvasBar = document.getElementById('rejectChart');
    if (canvasBar) {
        const existB = Chart.getChart("rejectChart");
        if (existB) existB.destroy();

        new Chart(canvasBar.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Penyok', 'Berlubang', 'Basah', 'Terbuka', 'Lainnya'],
                datasets: [{
                    label: 'Total Defects',
                    data: [210, 145, 95, 70, 40],
                    backgroundColor: ['#4e79a7', '#76b7b2', '#e15759', '#f28e2c', '#94a3b8'],
                    borderRadius: 6,
                    barThickness: 15
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, grid: { display: false } },
                    y: { grid: { display: false }, ticks: { color: '#3d342e', font: { weight: '600' } } }
                }
            }
        });
    }
}

/* =========================================
   3. CHART ENGINE (FULL STATISTICS PAGE)
   ========================================= */
function initFullStats() {
    const canvasFullD = document.getElementById('statsDoughnutFull');
    const canvasFullB = document.getElementById('statsBarFull');

    if (canvasFullD) {
        const existD = Chart.getChart("statsDoughnutFull");
        if (existD) existD.destroy();
        new Chart(canvasFullD.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Intact Items', 'Defect Items'],
                datasets: [{ 
                    data: [11980, 560], 
                    backgroundColor: ['#7baedb', '#3d342e'],
                    hoverOffset: 15
                }]
            },
            options: { maintainAspectRatio: false }
        });
    }

    if (canvasFullB) {
        const existB = Chart.getChart("statsBarFull");
        if (existB) existB.destroy();
        new Chart(canvasFullB.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Penyok', 'Berlubang', 'Basah', 'Terbuka', 'Lainnya'],
                datasets: [{
                    label: 'Defect Volume',
                    data: [210, 145, 95, 70, 40],
                    backgroundColor: ['#4e79a7', '#76b7b2', '#e15759', '#f28e2c', '#94a3b8']
                }]
            },
            options: { 
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

/* =========================================
   4. DATA FEEDER (HISTORY)
   ========================================= */
const historyData = [
    {date: '17/05/2026', time: '11:43:00', batch: '#B-7721', res: 'PASSED', acc: '99.4%'},
    {date: '17/05/2026', time: '11:40:45', batch: '#B-7720', res: 'REJECTED', acc: '98.2%'},
    {date: '17/05/2026', time: '11:38:30', batch: '#B-7719', res: 'PASSED', acc: '99.1%'},
    {date: '17/05/2026', time: '11:35:12', batch: '#B-7718', res: 'PASSED', acc: '97.8%'},
    {date: '17/05/2026', time: '11:32:00', batch: '#B-7717', res: 'REJECTED', acc: '95.4%'}
];

function fillHistory() {
    const dashBody = document.getElementById('dashboardHistoryBody'); // Di Halaman Utama
    const fullBody = document.getElementById('historyBodyFull');    // Di Halaman Archive

    const htmlContent = historyData.map(d => `
        <tr>
            <td style="color: #475569; font-weight: 600; font-size: 0.85rem;">${d.date}</td>
            <td style="color: #94a3b8; font-size: 0.8rem;">${d.time}</td>
            <td style="font-weight:600; color: #1e293b;">${d.batch}</td>
            <td><span class="${d.res === 'PASSED' ? 'status-passed' : 'status-rejected'}">${d.res}</span></td>
            <td style="font-family: monospace; font-weight: 700;">${d.acc}</td>
        </tr>
    `).join('');

    if (dashBody) dashBody.innerHTML = htmlContent;
    if (fullBody) fullBody.innerHTML = htmlContent;
}

/* =========================================
   5. UTILITIES (CLOCK & INIT)
   ========================================= */
function updateClockAndDate() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-GB');
    }
}

// Inisialisasi Saat Pertama Kali Load
window.addEventListener('load', () => {
    updateClockAndDate();
    setInterval(updateClock, 1000);
    renderDashboardCharts();
    fillHistory();
});