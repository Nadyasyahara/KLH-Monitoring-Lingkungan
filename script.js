// ======================================================
// AKUN PENGGUNA
// ======================================================

const accounts = [
    {
        username: "admin",
        password: "admin123",
        name: "Admin",
        role: "Admin"
    },
    {
        username: "user",
        password: "user123",
        name: "Pengguna",
        role: "Pengguna"
    }
];


// ======================================================
// DATA AWAL
// ======================================================

const initialData = [
    {
        id: 1,
        location: "Fakultas Teknik",
        type: "Anorganik",
        weight: 42,
        status: "Menumpuk",
        date: "2026-09-05",
        note: "Volume sampah cukup tinggi.",
        createdBy: "Pengguna"
    },

    {
        id: 2,
        location: "Fakultas FISIP",
        type: "Organik",
        weight: 18,
        status: "Bersih",
        date: "2026-09-05",
        note: "Kondisi lokasi bersih.",
        createdBy: "Pengguna"
    },

    {
        id: 3,
        location: "Fakultas FEB",
        type: "Campuran",
        weight: 27,
        status: "Sedang",
        date: "2026-09-04",
        note: "Terdapat beberapa sampah.",
        createdBy: "Pengguna"
    },

    {
        id: 4,
        location: "FKIP",
        type: "Organik",
        weight: 22,
        status: "Sedang",
        date: "2026-09-04",
        note: "Perlu dilakukan pemantauan.",
        createdBy: "Pengguna"
    },

    {
        id: 5,
        location: "Fakultas Hukum",
        type: "Anorganik",
        weight: 15,
        status: "Bersih",
        date: "2026-09-03",
        note: "Kondisi cukup bersih.",
        createdBy: "Pengguna"
    },

    {
        id: 6,
        location: "FMIPA",
        type: "Campuran",
        weight: 31,
        status: "Sedang",
        date: "2026-09-03",
        note: "Volume sampah sedang.",
        createdBy: "Pengguna"
    },

    {
        id: 7,
        location: "Fakultas Kesehatan Masyarakat",
        type: "Organik",
        weight: 20,
        status: "Bersih",
        date: "2026-09-02",
        note: "Kondisi lingkungan baik.",
        createdBy: "Pengguna"
    },

    {
        id: 8,
        location: "Fakultas Kedokteran",
        type: "Anorganik",
        weight: 12,
        status: "Bersih",
        date: "2026-09-02",
        note: "Tidak terdapat penumpukan.",
        createdBy: "Pengguna"
    },

    {
        id: 9,
        location: "Fakultas Kehutanan",
        type: "Organik",
        weight: 35,
        status: "Menumpuk",
        date: "2026-09-01",
        note: "Terdapat penumpukan sampah organik.",
        createdBy: "Pengguna"
    },

    {
        id: 10,
        location: "Fakultas Pertanian",
        type: "Campuran",
        weight: 38,
        status: "Menumpuk",
        date: "2026-09-01",
        note: "Volume sampah cukup tinggi.",
        createdBy: "Pengguna"
    },

    {
        id: 11,
        location: "Pascasarjana",
        type: "Anorganik",
        weight: 16,
        status: "Sedang",
        date: "2026-08-31",
        note: "Kondisi masih dalam pemantauan.",
        createdBy: "Pengguna"
    }
];


// ======================================================
// LOCAL STORAGE
// ======================================================

let monitoringData =
    JSON.parse(
        localStorage.getItem("MSG_monitoringData")
    ) || initialData;


let currentUser =
    JSON.parse(
        sessionStorage.getItem("MSG_currentUser")
    );

let wasteChart = null;
let statusChart = null;
let compositionChart = null;


// ======================================================
// ELEMENT
// ======================================================

const loginPage =
    document.getElementById("loginPage");

const appPage =
    document.getElementById("appPage");


// ======================================================
// LOGIN
// ======================================================

document
    .getElementById("loginForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        const username =
            document.getElementById("loginUsername")
                .value
                .trim();

        const password =
            document.getElementById("loginPassword")
                .value;

        const account =
            accounts.find(user =>
                user.username === username &&
                user.password === password
            );


        if (!account) {

            document.getElementById("loginError")
                .textContent =
                "Username atau password salah.";

            return;
        }


        currentUser = {
            name: account.name,
            role: account.role,
            username: account.username
        };


        sessionStorage.setItem(
            "MSG_currentUser",
            JSON.stringify(currentUser)
        );


        document.getElementById("loginError")
            .textContent = "";

        showApplication();

    });


// ======================================================
// MENAMPILKAN APLIKASI
// ======================================================

function showApplication() {

    loginPage.classList.add("hidden");

    appPage.classList.remove("hidden");


    document.getElementById("userName")
        .textContent = currentUser.name;

    document.getElementById("userRole")
        .textContent = currentUser.role;

    document.getElementById("userAvatar")
        .textContent =
        currentUser.name.charAt(0).toUpperCase();


    renderAll();

}


// ======================================================
// LOGOUT
// ======================================================

document
    .getElementById("logoutButton")
    .addEventListener("click", function () {

        sessionStorage.removeItem(
            "MSG_currentUser"
        );

        currentUser = null;

        appPage.classList.add("hidden");

        loginPage.classList.remove("hidden");

        document.getElementById("loginForm")
            .reset();

    });


// ======================================================
// HELPER
// ======================================================

function saveData() {

    localStorage.setItem(
        "MSG_monitoringData",
        JSON.stringify(monitoringData)
    );

}


function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "id-ID",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function getStatusClass(status) {

    if (status === "Bersih") {
        return "status-bersih";
    }

    if (status === "Sedang") {
        return "status-sedang";
    }

    return "status-menumpuk";

}


// ======================================================
// DATA TERBARU PER LOKASI
// ======================================================

function getLatestByLocation() {

    const latest = {};

    monitoringData.forEach(item => {

        if (
            !latest[item.location] ||
            new Date(item.date) >
            new Date(latest[item.location].date)
        ) {

            latest[item.location] = item;

        }

    });

    return Object.values(latest);

}


// ======================================================
// STATISTIK
// ======================================================

function updateMainStatistics() {

    const totalWaste =
        monitoringData.reduce(
            (total, item) =>
                total + Number(item.weight),
            0
        );


    const latestData =
        getLatestByLocation();


    const clean =
        latestData.filter(
            item => item.status === "Bersih"
        ).length;


    const medium =
        latestData.filter(
            item => item.status === "Sedang"
        ).length;


    const stacked =
        latestData.filter(
            item => item.status === "Menumpuk"
        ).length;


    document.getElementById("totalWaste")
        .textContent =
        `${totalWaste} kg`;

    document.getElementById("cleanLocations")
        .textContent =
        clean;

    document.getElementById("mediumLocations")
        .textContent =
        medium;

    document.getElementById("stackedLocations")
        .textContent =
        stacked;

}


// ======================================================
// DATA BERKALA
// ======================================================

function updatePeriodicData() {

    const today =
        new Date();


    const todayString =
        today.toISOString()
            .split("T")[0];


    const sevenDaysAgo =
        new Date(today);

    sevenDaysAgo.setDate(
        today.getDate() - 6
    );


    let todayWeight = 0;
    let weekWeight = 0;
    let monthWeight = 0;

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;


    monitoringData.forEach(item => {

        const itemDate =
            new Date(
                item.date + "T00:00:00"
            );


        const weight =
            Number(item.weight);


        if (item.date === todayString) {

            todayWeight += weight;

            todayCount++;

        }


        if (itemDate >= sevenDaysAgo) {

            weekWeight += weight;

            weekCount++;

        }


        if (
            itemDate.getMonth() ===
            today.getMonth() &&

            itemDate.getFullYear() ===
            today.getFullYear()
        ) {

            monthWeight += weight;

            monthCount++;

        }

    });


    document.getElementById("todayWaste")
        .textContent =
        `${todayWeight} kg`;

    document.getElementById("todayMonitoring")
        .textContent =
        `${todayCount} monitoring`;


    document.getElementById("weekWaste")
        .textContent =
        `${weekWeight} kg`;

    document.getElementById("weekMonitoring")
        .textContent =
        `${weekCount} monitoring`;


    document.getElementById("monthWaste")
        .textContent =
        `${monthWeight} kg`;

    document.getElementById("monthMonitoring")
        .textContent =
        `${monthCount} monitoring`;

}


// ======================================================
// INDIKATOR LINGKUNGAN
// ======================================================

function updateIndicators() {

    const totalVolume =
        monitoringData.reduce(
            (total, item) =>
                total + Number(item.weight),
            0
        );


    const typeTotals = {};


    monitoringData.forEach(item => {

        if (!typeTotals[item.type]) {
            typeTotals[item.type] = 0;
        }

        typeTotals[item.type] +=
            Number(item.weight);

    });


    let dominantType = "-";


    if (
        Object.keys(typeTotals).length > 0
    ) {

        dominantType =
            Object.keys(typeTotals)
                .reduce((a, b) =>
                    typeTotals[a] >
                    typeTotals[b]
                        ? a
                        : b
                );

    }


    let highest = null;


    monitoringData.forEach(item => {

        if (
            !highest ||
            Number(item.weight) >
            Number(highest.weight)
        ) {

            highest = item;

        }

    });


    document.getElementById("indicatorVolume")
        .textContent =
        `${totalVolume} kg`;


    document.getElementById("dominantType")
        .textContent =
        dominantType;


    if (highest) {

        document.getElementById("highestLocation")
            .textContent =
            highest.location;

        document.getElementById(
            "highestLocationValue"
        ).textContent =
            `${highest.weight} kg`;

    }

}


// ======================================================
// DASHBOARD TABLE
// ======================================================

function renderDashboardTable() {

    const table =
        document.getElementById(
            "dashboardTable"
        );


    const sorted =
        [...monitoringData]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 5);


    table.innerHTML = "";


    sorted.forEach((item, index) => {

        table.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.location}</td>

                <td>${item.type}</td>

                <td>${item.weight} kg</td>

                <td>
                    <span class="status-badge ${getStatusClass(item.status)}">
                        ${item.status}
                    </span>
                </td>

                <td>
                    ${formatDate(item.date)}
                </td>

            </tr>

        `;

    });

}


// ======================================================
// TABEL MONITORING
// ======================================================

function renderMonitoringTable() {

    const table =
        document.getElementById(
            "monitoringTable"
        );


    const search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();


    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    const type =
        document.getElementById(
            "typeFilter"
        ).value;


    const filtered =
        monitoringData.filter(item => {

            const matchSearch =
                item.location
                    .toLowerCase()
                    .includes(search);


            const matchStatus =
                status === "all" ||
                item.status === status;


            const matchType =
                type === "all" ||
                item.type === type;


            return (
                matchSearch &&
                matchStatus &&
                matchType
            );

        });


    table.innerHTML = "";


    filtered.forEach((item, index) => {

        let actionHTML = "-";


        // ADMIN MEMILIKI HAK KELOLA
        if (
            currentUser &&
            currentUser.role === "Admin"
        ) {

            actionHTML = `

                <div class="action-group">

                    <button
                        class="edit-btn"
                        onclick="editMonitoring(${item.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteMonitoring(${item.id})"
                    >
                        Hapus
                    </button>

                </div>

            `;

        }


        table.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>${item.location}</td>

                <td>${item.type}</td>

                <td>${item.weight} kg</td>

                <td>
                    <span class="status-badge ${getStatusClass(item.status)}">
                        ${item.status}
                    </span>
                </td>

                <td>
                    ${formatDate(item.date)}
                </td>

                <td>
                    ${item.createdBy || "Pengguna"}
                </td>

                <td>
                    ${actionHTML}
                </td>

            </tr>

        `;

    });


    if (filtered.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="empty-state"
                >
                    Data monitoring tidak ditemukan.
                </td>

            </tr>

        `;

    }

}


// ======================================================
// RIWAYAT
// ======================================================

function renderHistory() {

    const container =
        document.getElementById(
            "historyContainer"
        );


    const sorted =
        [...monitoringData]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );


    container.innerHTML = "";


    sorted.forEach(item => {

        container.innerHTML += `

            <div class="history-item">

                <div class="history-date">
                    ${formatDate(item.date)}
                </div>


                <div class="history-content">

                    <h3>
                        ${item.location}
                    </h3>

                    <p>
                        Jenis: ${item.type}
                    </p>

                    <p>
                        Volume: ${item.weight} kg
                    </p>

                    <span class="status-badge ${getStatusClass(item.status)}">
                        ${item.status}
                    </span>

                    <p>
                        Input oleh:
                        ${item.createdBy || "Pengguna"}
                    </p>

                    ${
                        item.note
                            ? `<p>${item.note}</p>`
                            : ""
                    }

                </div>

            </div>

        `;

    });

}


// ======================================================
// GRAFIK TREN
// ======================================================

function renderWasteChart() {

    const ctx =
        document.getElementById(
            "wasteChart"
        );


    const dateTotals = {};


    monitoringData.forEach(item => {

        if (!dateTotals[item.date]) {
            dateTotals[item.date] = 0;
        }

        dateTotals[item.date] +=
            Number(item.weight);

    });


    const dates =
        Object.keys(dateTotals)
            .sort();


    const values =
        dates.map(
            date => dateTotals[date]
        );


    if (wasteChart) {
        wasteChart.destroy();
    }


    wasteChart =
        new Chart(ctx, {

            type: "line",

            data: {

                labels:
                    dates.map(formatDate),

                datasets: [

                    {

                        label:
                            "Volume Sampah (kg)",

                        data: values,

                        borderWidth: 2,

                        tension: 0.3,

                        fill: false

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

}


// ======================================================
// GRAFIK STATUS
// ======================================================

function renderStatusChart() {

    const ctx =
        document.getElementById(
            "statusChart"
        );


    const latest =
        getLatestByLocation();


    const clean =
        latest.filter(
            item => item.status === "Bersih"
        ).length;


    const medium =
        latest.filter(
            item => item.status === "Sedang"
        ).length;


    const stacked =
        latest.filter(
            item => item.status === "Menumpuk"
        ).length;


    if (statusChart) {
        statusChart.destroy();
    }


    statusChart =
        new Chart(ctx, {

            type: "doughnut",

            data: {

                labels: [
                    "Bersih",
                    "Sedang",
                    "Menumpuk"
                ],

                datasets: [

                    {

                        data: [
                            clean,
                            medium,
                            stacked
                        ],

                        borderWidth: 1

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        });

}


// ======================================================
// GRAFIK KOMPOSISI
// ======================================================

function renderCompositionChart() {

    const ctx =
        document.getElementById(
            "compositionChart"
        );


    const typeTotals = {};


    monitoringData.forEach(item => {

        if (!typeTotals[item.type]) {
            typeTotals[item.type] = 0;
        }

        typeTotals[item.type] +=
            Number(item.weight);

    });


    if (compositionChart) {
        compositionChart.destroy();
    }


    compositionChart =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels:
                    Object.keys(typeTotals),

                datasets: [

                    {

                        label:
                            "Volume Sampah (kg)",

                        data:
                            Object.values(typeTotals),

                        borderWidth: 1

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }

        });

}


// ======================================================
// MODAL TAMBAH
// ======================================================

const monitoringModal =
    document.getElementById(
        "monitoringModal"
    );


function openMonitoringModal() {

    monitoringModal.classList.add("show");

}


function closeMonitoringModal() {

    monitoringModal.classList.remove("show");

}


document
    .getElementById(
        "openModalMonitoring"
    )
    .addEventListener(
        "click",
        openMonitoringModal
    );


document
    .getElementById(
        "openModalMonitoring2"
    )
    .addEventListener(
        "click",
        openMonitoringModal
    );


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeMonitoringModal
    );


document
    .getElementById("cancelModal")
    .addEventListener(
        "click",
        closeMonitoringModal
    );


// ======================================================
// TAMBAH DATA MONITORING
// ======================================================

document
    .getElementById("monitoringForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const newData = {

                id: Date.now(),

                location:
                    document.getElementById(
                        "location"
                    ).value,

                type:
                    document.getElementById(
                        "type"
                    ).value,

                weight:
                    Number(
                        document.getElementById(
                            "weight"
                        ).value
                    ),

                status:
                    document.getElementById(
                        "status"
                    ).value,

                date:
                    document.getElementById(
                        "date"
                    ).value,

                note:
                    document.getElementById(
                        "note"
                    ).value,

                createdBy:
                    currentUser.name

            };


            monitoringData.push(newData);

            saveData();

            this.reset();

            setDefaultDate();

            closeMonitoringModal();

            renderAll();

        }
    );


// ======================================================
// EDIT DATA - ADMIN
// ======================================================

function editMonitoring(id) {

    if (
        !currentUser ||
        currentUser.role !== "Admin"
    ) {

        alert(
            "Hanya Admin yang dapat mengedit data."
        );

        return;

    }


    const item =
        monitoringData.find(
            item => item.id === id
        );


    if (!item) return;


    document.getElementById("editId")
        .value = item.id;


    document.getElementById("editLocation")
        .value = item.location;


    document.getElementById("editType")
        .value = item.type;


    document.getElementById("editWeight")
        .value = item.weight;


    document.getElementById("editStatus")
        .value = item.status;


    document.getElementById("editDate")
        .value = item.date;


    document.getElementById("editNote")
        .value = item.note || "";


    document
        .getElementById("editModal")
        .classList.add("show");

}


// ======================================================
// SIMPAN EDIT
// ======================================================

document
    .getElementById("editForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            if (
                !currentUser ||
                currentUser.role !== "Admin"
            ) {

                return;

            }


            const id =
                Number(
                    document.getElementById(
                        "editId"
                    ).value
                );


            const item =
                monitoringData.find(
                    item => item.id === id
                );


            if (!item) return;


            item.location =
                document.getElementById(
                    "editLocation"
                ).value;


            item.type =
                document.getElementById(
                    "editType"
                ).value;


            item.weight =
                Number(
                    document.getElementById(
                        "editWeight"
                    ).value
                );


            item.status =
                document.getElementById(
                    "editStatus"
                ).value;


            item.date =
                document.getElementById(
                    "editDate"
                ).value;


            item.note =
                document.getElementById(
                    "editNote"
                ).value;


            saveData();

            closeEditModal();

            renderAll();

        }
    );


// ======================================================
// TUTUP EDIT
// ======================================================

function closeEditModal() {

    document
        .getElementById("editModal")
        .classList.remove("show");

}


document
    .getElementById("closeEditModal")
    .addEventListener(
        "click",
        closeEditModal
    );


document
    .getElementById("cancelEdit")
    .addEventListener(
        "click",
        closeEditModal
    );


// ======================================================
// HAPUS DATA - ADMIN
// ======================================================

function deleteMonitoring(id) {

    if (
        !currentUser ||
        currentUser.role !== "Admin"
    ) {

        alert(
            "Hanya Admin yang dapat menghapus data."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Apakah data monitoring ini ingin dihapus?"
        );


    if (!confirmDelete) return;


    monitoringData =
        monitoringData.filter(
            item => item.id !== id
        );


    saveData();

    renderAll();

}


// ======================================================
// NAVIGASI
// ======================================================

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                showSection(
                    this.dataset.section
                );

            }
        );

    });


function showSection(sectionId) {

    document
        .querySelectorAll(".page-section")
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.classList.remove(
                "active"
            );

        });


    const section =
        document.getElementById(
            sectionId
        );


    const link =
        document.querySelector(
            `[data-section="${sectionId}"]`
        );


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    if (link) {

        link.classList.add("active");

    }

}


// ======================================================
// LIHAT SEMUA
// ======================================================

document
    .getElementById("viewAllMonitoring")
    .addEventListener(
        "click",
        function () {

            showSection("monitoring");

        }
    );


// ======================================================
// SEARCH
// ======================================================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        renderMonitoringTable
    );


document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        renderMonitoringTable
    );


document
    .getElementById("typeFilter")
    .addEventListener(
        "change",
        renderMonitoringTable
    );


// ======================================================
// TANGGAL DEFAULT
// ======================================================

function setDefaultDate() {

    document.getElementById("date")
        .value =
        new Date()
            .toISOString()
            .split("T")[0];

}


setDefaultDate();


// ======================================================
// RENDER SEMUA
// ======================================================

function renderAll() {

    updateMainStatistics();

    updatePeriodicData();

    updateIndicators();

    renderDashboardTable();

    renderMonitoringTable();

    renderHistory();

    renderWasteChart();

    renderStatusChart();

    renderCompositionChart();

}


// ======================================================
// CEK SESSION
// ======================================================

if (currentUser) {

    showApplication();

}