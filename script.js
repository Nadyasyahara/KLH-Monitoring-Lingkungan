/* =========================================
   DATA MONITORING
========================================= */

let monitoringData = [
    {
        id: 1,
        location: "Fakultas Teknik",
        type: "Anorganik",
        weight: 42,
        status: "Menumpuk",
        date: "2026-09-05",
        note: "Sampah plastik cukup banyak ditemukan."
    },

    {
        id: 2,
        location: "Fakultas FISIP",
        type: "Organik",
        weight: 18,
        status: "Bersih",
        date: "2026-09-05",
        note: "Kondisi lingkungan cukup bersih."
    },

    {
        id: 3,
        location: "Fakultas FEB",
        type: "Campuran",
        weight: 27,
        status: "Sedang",
        date: "2026-09-04",
        note: "Terdapat beberapa sampah di sekitar area."
    },

    {
        id: 4,
        location: "FKIP",
        type: "Organik",
        weight: 22,
        status: "Sedang",
        date: "2026-09-04",
        note: "Sampah daun dan sisa makanan."
    },

    {
        id: 5,
        location: "Fakultas Hukum",
        type: "Anorganik",
        weight: 15,
        status: "Bersih",
        date: "2026-09-03",
        note: "Kondisi lingkungan terpantau bersih."
    },

    {
        id: 6,
        location: "FMIPA",
        type: "Campuran",
        weight: 31,
        status: "Sedang",
        date: "2026-09-03",
        note: "Terdapat sampah organik dan anorganik."
    },

    {
        id: 7,
        location: "Fakultas Kesehatan Masyarakat",
        type: "Organik",
        weight: 20,
        status: "Bersih",
        date: "2026-09-02",
        note: "Sampah relatif sedikit."
    },

    {
        id: 8,
        location: "Fakultas Kedokteran",
        type: "Anorganik",
        weight: 12,
        status: "Bersih",
        date: "2026-09-02",
        note: "Kondisi lingkungan cukup baik."
    },

    {
        id: 9,
        location: "Fakultas Kehutanan",
        type: "Organik",
        weight: 35,
        status: "Menumpuk",
        date: "2026-09-01",
        note: "Banyak sampah daun pada area pemantauan."
    },

    {
        id: 10,
        location: "Fakultas Pertanian",
        type: "Campuran",
        weight: 38,
        status: "Menumpuk",
        date: "2026-09-01",
        note: "Volume sampah cukup tinggi."
    },

    {
        id: 11,
        location: "Pascasarjana",
        type: "Anorganik",
        weight: 16,
        status: "Sedang",
        date: "2026-08-31",
        note: "Terdapat beberapa sampah plastik."
    }
];


/* =========================================
   FORMAT TANGGAL
========================================= */

function formatDate(date) {

    const options = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    return new Date(date).toLocaleDateString(
        "id-ID",
        options
    );
}


/* =========================================
   STATUS CLASS
========================================= */

function getStatusClass(status) {

    if (status === "Bersih") {
        return "status status-bersih";
    }

    if (status === "Sedang") {
        return "status status-sedang";
    }

    if (status === "Menumpuk") {
        return "status status-menumpuk";
    }

    return "status";
}


/* =========================================
   STATISTIK DASHBOARD
========================================= */

function renderStatistics() {

    const totalLocations =
        new Set(
            monitoringData.map(item => item.location)
        ).size;

    const totalWaste =
        monitoringData.reduce(
            (total, item) => total + Number(item.weight),
            0
        );

    const cleanLocations =
        new Set(
            monitoringData
                .filter(item => item.status === "Bersih")
                .map(item => item.location)
        ).size;

    const attentionLocations =
        new Set(
            monitoringData
                .filter(
                    item =>
                        item.status === "Sedang" ||
                        item.status === "Menumpuk"
                )
                .map(item => item.location)
        ).size;


    document.getElementById("totalLocations").textContent =
        totalLocations;

    document.getElementById("totalWaste").textContent =
        totalWaste + " kg";

    document.getElementById("cleanLocations").textContent =
        cleanLocations;

    document.getElementById("attentionLocations").textContent =
        attentionLocations;
}


/* =========================================
   TABEL DASHBOARD
========================================= */

function renderDashboardTable() {

    const table =
        document.getElementById("dashboardTable");

    table.innerHTML = "";


    const latestData =
        [...monitoringData]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 6);


    latestData.forEach((item, index) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>${item.location}</strong>
            </td>

            <td>${item.type}</td>

            <td>
                ${item.weight} kg
            </td>

            <td>
                <span class="${getStatusClass(item.status)}">
                    ${item.status}
                </span>
            </td>

            <td>
                ${formatDate(item.date)}
            </td>
        `;

        table.appendChild(row);
    });
}


/* =========================================
   TABEL DATA MONITORING
========================================= */

function renderMonitoringTable() {

    const table =
        document.getElementById("monitoringTable");

    table.innerHTML = "";


    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const statusFilter =
        document.getElementById("statusFilter").value;

    const typeFilter =
        document.getElementById("typeFilter").value;


    const filteredData =
        monitoringData.filter(item => {

            const matchSearch =
                item.location
                    .toLowerCase()
                    .includes(search);

            const matchStatus =
                statusFilter === "all" ||
                item.status === statusFilter;

            const matchType =
                typeFilter === "all" ||
                item.type === typeFilter;

            return (
                matchSearch &&
                matchStatus &&
                matchType
            );
        });


    if (filteredData.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="8" class="empty-data">
                    Data monitoring tidak ditemukan.
                </td>
            </tr>
        `;

        return;
    }


    filteredData.forEach((item, index) => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>${item.location}</strong>
            </td>

            <td>${item.type}</td>

            <td>
                ${item.weight} kg
            </td>

            <td>
                <span class="${getStatusClass(item.status)}">
                    ${item.status}
                </span>
            </td>

            <td>
                ${formatDate(item.date)}
            </td>

            <td>
                ${item.note || "-"}
            </td>

            <td>

                <div class="action-group">

                    <button
                        class="btn-action btn-status"
                        onclick="changeStatus(${item.id})">
                        Status
                    </button>

                    <button
                        class="btn-action btn-delete"
                        onclick="deleteMonitoring(${item.id})">
                        Hapus
                    </button>

                </div>

            </td>
        `;

        table.appendChild(row);
    });
}


/* =========================================
   RIWAYAT MONITORING
========================================= */

function renderHistory() {

    const container =
        document.getElementById("historyContainer");

    container.innerHTML = "";


    const sortedData =
        [...monitoringData]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );


    sortedData.forEach(item => {

        const history =
            document.createElement("div");

        history.className = "history-item";

        history.innerHTML = `

            <div class="history-main">

                <div class="history-date">
                    ${formatDate(item.date)}
                </div>

                <div>

                    <div class="history-location">
                        ${item.location}
                    </div>

                    <div class="history-detail">
                        ${item.type} •
                        ${item.weight} kg
                    </div>

                </div>

            </div>


            <div class="history-right">

                <span class="${getStatusClass(item.status)}">
                    ${item.status}
                </span>

                <span class="history-detail">
                    ${item.note || "-"}
                </span>

            </div>
        `;

        container.appendChild(history);
    });
}


/* =========================================
   GRAFIK VOLUME SAMPAH
========================================= */

let wasteChart;


function createWasteChart() {

    const canvas =
        document.getElementById("wasteChart");

    if (!canvas) return;


    const groupedData = {};


    monitoringData.forEach(item => {

        if (!groupedData[item.date]) {
            groupedData[item.date] = 0;
        }

        groupedData[item.date] +=
            Number(item.weight);
    });


    const dates =
        Object.keys(groupedData).sort();


    const labels =
        dates.map(date => formatDate(date));


    const values =
        dates.map(date => groupedData[date]);


    if (wasteChart) {
        wasteChart.destroy();
    }


    wasteChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels: labels,

                datasets: [{

                    label: "Volume Sampah (kg)",

                    data: values,

                    borderWidth: 2,

                    tension: 0.3,

                    fill: false

                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: true
                    }

                },

                scales: {

                    y: {
                        beginAtZero: true
                    }

                }
            }
        });
}


/* =========================================
   GRAFIK KOMPOSISI SAMPAH
========================================= */

let compositionChart;


function createCompositionChart() {

    const canvas =
        document.getElementById("compositionChart");

    if (!canvas) return;


    const composition = {

        Organik: 0,

        Anorganik: 0,

        Campuran: 0

    };


    monitoringData.forEach(item => {

        composition[item.type] +=
            Number(item.weight);

    });


    if (compositionChart) {
        compositionChart.destroy();
    }


    compositionChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Organik",
                    "Anorganik",
                    "Campuran"
                ],

                datasets: [{

                    data: [
                        composition.Organik,
                        composition.Anorganik,
                        composition.Campuran
                    ],

                    borderWidth: 2
                }]
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


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById("monitoringModal");

const openButton =
    document.getElementById("openModalMonitoring");

const openButton2 =
    document.getElementById("openModalMonitoring2");

const closeButton =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelModal");


function openModal() {

    modal.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "auto";
}


openButton.addEventListener(
    "click",
    openModal
);


openButton2.addEventListener(
    "click",
    openModal
);


closeButton.addEventListener(
    "click",
    closeModal
);


cancelButton.addEventListener(
    "click",
    closeModal
);


/* Klik area luar modal */

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeModal();
        }

    }
);


/* =========================================
   TAMBAH DATA MONITORING
========================================= */

const monitoringForm =
    document.getElementById("monitoringForm");


monitoringForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const newData = {

            id:
                Date.now(),

            location:
                document.getElementById("location").value,

            type:
                document.getElementById("type").value,

            weight:
                Number(
                    document.getElementById("weight").value
                ),

            status:
                document.getElementById("status").value,

            date:
                document.getElementById("date").value,

            note:
                document.getElementById("note").value

        };


        monitoringData.unshift(newData);


        saveData();


        renderAll();


        monitoringForm.reset();


        closeModal();


        alert(
            "Data monitoring berhasil ditambahkan."
        );
    }
);


/* =========================================
   UBAH STATUS
========================================= */

function changeStatus(id) {

    const item =
        monitoringData.find(
            item => item.id === id
        );


    if (!item) return;


    if (item.status === "Bersih") {

        item.status = "Sedang";

    } else if (item.status === "Sedang") {

        item.status = "Menumpuk";

    } else {

        item.status = "Bersih";

    }


    saveData();

    renderAll();
}


/* =========================================
   HAPUS DATA
========================================= */

function deleteMonitoring(id) {

    const confirmation =
        confirm(
            "Apakah Anda yakin ingin menghapus data monitoring ini?"
        );


    if (!confirmation) {
        return;
    }


    monitoringData =
        monitoringData.filter(
            item => item.id !== id
        );


    saveData();

    renderAll();
}


/* =========================================
   SEARCH DAN FILTER
========================================= */

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


/* =========================================
   NAVIGASI HALAMAN
========================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll(".page-section");


function showSection(sectionId) {

    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const target =
        document.getElementById(sectionId);

    if (target) {

        target.classList.add(
            "active-section"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            "#" + sectionId
        ) {

            link.classList.add("active");

        }

    });
}


/* Klik menu navigasi */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const sectionId =
                this.getAttribute("href")
                    .substring(1);


            showSection(sectionId);

        }
    );

});


/* =========================================
   LINK "LIHAT SEMUA"
========================================= */

const viewAll =
    document.querySelector(".view-all");


if (viewAll) {

    viewAll.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            showSection("monitoring");

        }
    );

}


/* =========================================
   LOCAL STORAGE
========================================= */

function saveData() {

    localStorage.setItem(
        "MSG_monitoringData",
        JSON.stringify(monitoringData)
    );
}


function loadData() {

    const savedData =
        localStorage.getItem(
            "MSG_monitoringData"
        );


    if (savedData) {

        monitoringData =
            JSON.parse(savedData);

    }
}


/* =========================================
   RENDER SEMUA DATA
========================================= */

function renderAll() {

    renderStatistics();

    renderDashboardTable();

    renderMonitoringTable();

    renderHistory();

    createWasteChart();

    createCompositionChart();
}


/* =========================================
   JALANKAN APLIKASI
========================================= */

loadData();

renderAll();