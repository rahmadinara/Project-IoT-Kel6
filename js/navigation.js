const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
    // Menambah/menghapus class 'show' pada navigasi
    navList.classList.toggle('show');
    
    // Menambah animasi pada icon hamburger
    menuToggle.classList.toggle('active');
});

