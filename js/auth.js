document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Membuat akun admin default otomatis di awal sistem jika database belum terbentuk sama sekali
    if (!localStorage.getItem("usersDatabase")) {
        const defaultUsers = [
            { username: "admin", password: "admin", role: "Super Admin" }
        ];
        localStorage.setItem("usersDatabase", JSON.stringify(defaultUsers));
    }

    if (loginForm) {
        loginForm.reset(); 

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputUser = document.getElementById("username").value.trim();
            const inputPass = document.getElementById("password").value;

            // MEMBACA DATABASE YANG SAMA: Mengambil database dinamis dari localStorage
            const usersDatabase = JSON.parse(localStorage.getItem("usersDatabase"));

            // Cari kecocokan data input dengan semua data user (termasuk hasil input dari users.html)
            const validUser = usersDatabase.find(u => u.username === inputUser && u.password === inputPass);

            if (validUser) {
                // Jika data cocok, izinkan masuk ke dashboard
                localStorage.setItem("session", "active");
                localStorage.setItem("currentUser", validUser.username);
                localStorage.setItem("currentUserRole", validUser.role);

                window.location.href = "dashboard.html";
            } else {
                alert("Username atau Password salah!");
                loginForm.reset();
            }
        });
    }
});document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Membuat akun admin default otomatis di awal sistem jika database belum terbentuk sama sekali
    if (!localStorage.getItem("usersDatabase")) {
        const defaultUsers = [
            { username: "admin", password: "admin", role: "Super Admin" }
        ];
        localStorage.setItem("usersDatabase", JSON.stringify(defaultUsers));
    }

    if (loginForm) {
        loginForm.reset(); 

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputUser = document.getElementById("username").value.trim();
            const inputPass = document.getElementById("password").value;

            // MEMBACA DATABASE YANG SAMA: Mengambil database dinamis dari localStorage
            const usersDatabase = JSON.parse(localStorage.getItem("usersDatabase"));

            // Cari kecocokan data input dengan semua data user (termasuk hasil input dari users.html)
            const validUser = usersDatabase.find(u => u.username === inputUser && u.password === inputPass);

            if (validUser) {
                // Jika data cocok, izinkan masuk ke dashboard
                localStorage.setItem("session", "active");
                localStorage.setItem("currentUser", validUser.username);
                localStorage.setItem("currentUserRole", validUser.role);

                window.location.href = "dashboard.html";
            } else {
                alert("Inc=valid Username or Password");
                loginForm.reset();
            }
        });
    }
});