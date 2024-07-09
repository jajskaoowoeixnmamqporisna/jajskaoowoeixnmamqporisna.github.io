document.addEventListener("DOMContentLoaded", function() {
    // navAndIndicator
    const bottomNav = document.createElement("div");
    bottomNav.className = "bottom-nav";
    bottomNav.innerHTML = `
        <div class="nav-item active" onclick="activateNav(this, 'section1')">
            <span class="icon"><i class="bi bi-house"></i></span>
            <span class="label">Home</span>
        </div>
        <div class="nav-item" onclick="activateNav(this, 'section2')">
            <span class="icon"><i class="bi bi-search"></i></span>
            <span class="label">Search</span>
        </div>
        <div class="nav-item" onclick="activateNav(this, 'section3')">
            <span class="icon"><i class="bi bi-plus-circle"></i></span>
            <span class="label">Upload</span>
        </div>
        <div class="nav-item" onclick="activateNav(this, 'section4')">
            <span class="icon" id="notification-icon"><i class="bi bi-bell"></i></span>
            <span class="label">Notification</span>
        </div>
        <div class="nav-item" onclick="activateNav(this, 'section5')">
            <span class="icon"><i class="bi bi-person"></i></span>
            <span class="label">Profile</span>
        </div>
        <div class="indicator"></div>
        <div class="indicator2"></div>
    `;
    const styleSectionHalaman = document.createElement("style");
    styleSectionHalaman.innerHTML = `
        #section1 {
            background: linear-gradient(to left, #ffaab5 0%, #d8d8d8 50%, #95b7ff 100%);
        }
    `;
    document.body.appendChild(bottomNav);
    document.head.appendChild(styleSectionHalaman);
});

    function activateNav(element, sectionId) {
        var navItems = document.querySelectorAll(".bottom-nav .nav-item");
        navItems.forEach(function(navItem) {
            navItem.classList.remove("active");
        });
        element.classList.add("active");

        var sections = document.querySelectorAll(".section");
        sections.forEach(function(section) {
            section.classList.remove("active");
        });
        document.getElementById(sectionId).classList.add("active");

        var indicator = document.querySelector(".indicator");
        var indicator2 = document.querySelector(".indicator2");
        var index = Array.from(navItems).indexOf(element);
        indicator.style.left = (index * 20) + "%";
        indicator2.style.top = (index * 20) + "%";
    }

// SistemStatusAndPembaruan
const urlDataUser = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbc66HXqX8MQVkBUR_I4-Z0zLJMpft1WcPcSuWhZmOooDN0QlEtA8D-g9JmGlNuisyIhWgWB3DWe36/pub?output=tsv";

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch(urlDataUser);
        const data = await response.text();
        
        const rows = data.split("\n").map(row => row.split("\t"));
        
        const usernameElements = document.querySelectorAll(".username");
        
        rows.forEach(row => {
            const userID = row[2].trim();
            const userName = row[3].trim();
            const userProfile = row[5].trim();
            const linkAccount = row[6].trim();
            const fixedUserName = userName.replace('class"', 'class="');
            
            const usernameWithProfile = `<img src="${userProfile}" alt="" oncontextmenu="return false;">
                                         <div class="containerName">
                                             <h1>${fixedUserName}</h1>
                                             <p>@${userID}</p>
                                         </div>`;
            
            usernameElements.forEach(element => {
                if (element.innerHTML.includes(userID)) {
                    element.innerHTML = usernameWithProfile;
                    element.onclick = () => window.location.href = linkAccount;
                }
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const section1N2 = document.getElementById("section1");
    const home2Container = document.createElement("div");
    home2Container.classList.add("container-popup-content");

    home2Container.innerHTML = `
        <div class="header-top">
            <h1>G90 Account - For You</h1>
            <a href="" class="mainButtonHeader"><i class="bi bi-arrow-repeat"></i></a>
            <a><i class="bi bi-bookmark"></i></a>
            <a><i class="bi bi-info-circle"></i></a>
        </div>
        <div class="status-content" id="statusContent"></div>
        <hr>
        <div id="contentke2"></div>
    `;

    section1N2.appendChild(home2Container);

    checkFollowStatus();
    displayAllContent();
});

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function clickReport(isiDalamForm, hehehe, g90id, nc, ac, imgName) {
    const message = `Halo tim G90NF saya ingin melaporkan adanya suatu konten di dalam G90 Kreatif\n\nLaporan : ${isiDalamForm}\nUsername : ${hehehe}\nG90ID : ${g90id}\nNC : ${nc}\nAC : ${imgName}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '6285669690653';
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.location.href = url;
}

function fetchFiles(displayContentFunc, containerId) {
    fetch("https://api.github.com/repos/g90nf/Database/contents/sosialmedia")
        .then(response => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then(files => {
            console.log("Fetched files:", files);
            const contentContainer = document.getElementById(containerId);
            if (!contentContainer) {
                console.error("Content container not found");
                return;
            }
            contentContainer.innerHTML = "";
            const fileObjects = [];

            files.forEach(file => {
                const fileName = file.name;
                let fileParts = fileName.split("$&$");
                fileParts = fileParts.map(part => part.replace(/&&&20/g, " ").replace(/&&&10/g, "<br>").replace(/###tiktok/g, '<i class="bi bi-tiktok"></i>'));

                let lastPart = fileParts[fileParts.length - 1];
                if (lastPart.endsWith(".jpg") || lastPart.endsWith(".png") || lastPart.endsWith(".mp4")) {
                    lastPart = lastPart.substring(0, lastPart.length - 4);
                    fileParts[fileParts.length - 1] = lastPart;
                }

                const date = new Date(fileParts[3]);
                if (!isNaN(date.getTime())) {
                    file.date = date;
                    file.parsedParts = fileParts;
                    fileObjects.push(file);
                }
            });

            fileObjects.sort((a, b) => b.date - a.date);

            fileObjects.forEach(file => displayContentFunc(file, contentContainer));

            // Implement Intersection Observer to pause videos when they are not in view
            const videos = document.querySelectorAll("video");
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.play();
                    } else {
                        entry.target.pause();
                    }
                });
            }, {
                threshold: 0.25 // Adjust the threshold as needed
            });

            videos.forEach(video => observer.observe(video));
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function displayContent(file, contentContainer) {
    const fileName = file.name;
    const isVideo = fileName.endsWith(".mp4");
    const mediaSrc = `https://raw.githubusercontent.com/g90nf/Database/main/sosialmedia/${fileName}`;
    let displayContent;

    if (isVideo) {
        displayContent = `
            <div class="item-content-home">
                <div class="header-item-content">
                    <p id="username" class="username">${file.parsedParts[1]}</p>
                </div>
                <video src="${mediaSrc}" controls oncontextmenu="return false;"></video>
                <div class="menu-content">
                    <div class="container-item-menu">
                        <i class="bi bi-heart"></i>
                        <span>Like</span>
                    </div>
                    <div class="container-item-menu">
                        <i class="bi bi-bookmark"></i>
                        <span>Favorite</span>
                    </div>
                    <div class="container-item-menu" onclick="clickReport('Konten mengandung aktifitas seksual', '${file.parsedParts[1]}', '8282828', '922991', '818182', '${fileName}')">
                        <i class="bi bi-flag"></i>
                        <span>Report</span>
                    </div>
                </div>
                <p class="deskripsi">${file.parsedParts[2]}</p>
                <p class="date">${file.parsedParts[3]}</p>
            </div>
            <hr>`;
    } else {
        displayContent = `
            <div class="item-content-home">
                <div class="header-item-content">
                    <p id="username" class="username">${file.parsedParts[1]}</p>
                </div>
                <img src="${mediaSrc}" oncontextmenu="return false;">
                <div class="menu-content">
                    <div class="container-item-menu">
                        <i class="bi bi-heart"></i>
                        <span>Like</span>
                    </div>
                    <div class="container-item-menu">
                        <i class="bi bi-bookmark"></i>
                        <span>Favorite</span>
                    </div>
                    <div class="container-item-menu" onclick="clickReport('Konten mengandung aktifitas seksual', '${file.parsedParts[1]}', '8282828', '922991', '818182', '${fileName}')">
                        <i class="bi bi-flag"></i>
                        <span>Report</span>
                    </div>
                </div>
                <p class="deskripsi">${file.parsedParts[2]}</p>
                <p class="date">${file.parsedParts[3]}</p>
            </div>
            <hr>`;
    }

    contentContainer.innerHTML += displayContent;
}

function checkFollowStatus() {
    const followedPrefixes = [];

    document.cookie.split(";").forEach(cookie => {
        const parts = cookie.split("=");
        if (parts[0].trim().startsWith("follow-") && parts[1].trim() === "true") {
            followedPrefixes.push(parts[0].trim().substring(7));
        }
    });

    fetchFiles((file, contentContainer) => {
        const filePrefix = file.parsedParts[0];
        if (followedPrefixes.includes(filePrefix)) {
            displayContent(file, contentContainer);
        }
    }, "content");
}

function displayAllContent() {
    fetchFiles(displayContent, "contentke2");
		}


            


// SistemSearch
document.addEventListener("DOMContentLoaded", function() {
    fetch(urlDataUser)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").map(row => row.split("\t"));
            const sectionSearchMainS = document.getElementById("section2");
            const containerSearch = document.querySelector(".data-container-search");
            const searchInput = document.getElementById("searchAccount");
            const searchButton = document.getElementById("searchButton");
            const loadingIndicator = document.createElement("div");
            loadingIndicator.classList.add("loading-indicator");
            loadingIndicator.innerHTML = `
                <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
	             <circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
	             <circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
	             <circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
</svg>
            `;
            sectionSearchMainS.appendChild(loadingIndicator);
            loadingIndicator.style.display = "none";
            
            function createPopUpAccountContent(linkAccountS) {
                const sectionSearchMainS = document.getElementById("section2");
                const popupAccountContainer = document.createElement("div");
                popupAccountContainer.classList.add("popup-container-account");
                
                const popupAllItemHeader = document.createElement("div");
                popupAllItemHeader.classList.add("popup-header-all-item");
                
                const removeLink = document.createElement("a");
                removeLink.innerHTML = `x`;
                removeLink.href = "#";
                removeLink.addEventListener("click", function(event) {
                    event.preventDefault();
                    sectionSearchMainS.removeChild(popupAccountContainer);
                });
                
                popupAllItemHeader.appendChild(removeLink);
                
                const popupAccountItem = document.createElement("iframe");
                popupAccountItem.src = linkAccountS;
                
                popupAccountContainer.appendChild(popupAllItemHeader);
                popupAccountContainer.appendChild(popupAccountItem);
                sectionSearchMainS.appendChild(popupAccountContainer);
            }
            
            // Fungsi untuk mengacak array
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            
            function renderResults(filteredRows) {
                // Kosongkan containerSearch
                containerSearch.innerHTML = "";
                
                // Acak filteredRows
                const shuffledRows = shuffleArray(filteredRows);
                
                shuffledRows.forEach(row => {
                    const userIDS = row[2].trim();
                    const userNameS = row[3].trim();
                    const userProfileS = row[5].trim();
                    const linkAccountS = row[6].trim();
                    const fixedUserNameS = userNameS.replace('class"', 'class="');
                    
                    const itemSearchS = document.createElement("div");
                    itemSearchS.classList.add("data-account-search");
                    
                    const userProfileSearch = document.createElement("img");
                    userProfileSearch.src = userProfileS;
                    
                    const itemNameS = document.createElement("div");
                    itemNameS.classList.add("item-name-search");
                    
                    const userNameSearch = document.createElement("h1");
                    userNameSearch.innerHTML = fixedUserNameS;
                    
                    const userIDSearch = document.createElement("p");
                    userIDSearch.textContent = "@" + userIDS;
                    
                    itemSearchS.onclick = function() {
                        createPopUpAccountContent(linkAccountS);
                    };
                    
                    itemSearchS.appendChild(userProfileSearch);
                    itemNameS.appendChild(userNameSearch);
                    itemNameS.appendChild(userIDSearch);
                    itemSearchS.appendChild(itemNameS);
                    containerSearch.appendChild(itemSearchS);
                });
            }
            
            function performSearch() {
                loadingIndicator.style.display = "block";
                const randomTimeout = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;
                setTimeout(() => {
                    const searchTerm = searchInput.value.toLowerCase();
                    const filteredRows = rows.filter(row => row[3].toLowerCase().includes(searchTerm));
                    renderResults(filteredRows);
                    loadingIndicator.style.display = "none";
                }, randomTimeout);
            }
            
            if (searchButton && searchInput) {
                searchButton.addEventListener("click", performSearch);
                searchInput.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
          }
                });
                
                renderResults(rows); // Render hasil pertama kali dengan data urutan asli
            } else {
                console.error("Error: searchButton or searchInput element not found");
            }
        })
        .catch(error => console.error("Error:", error));
});

// Sistem Upload
document.addEventListener("DOMContentLoaded", function() {
    function uploadFileSemua(linkUpload) {
        const sectionSearchMainU = document.getElementById("section3");
        const popupAccountContainerU = document.createElement("div");
        popupAccountContainerU.classList.add("popup-container-account");

        const popupAllItemHeaderU = document.createElement("div");
        popupAllItemHeaderU.classList.add("popup-header-all-item");

        const removeLinkU = document.createElement("a");
        removeLinkU.innerHTML = `x`;
        removeLinkU.href = "#";
        removeLinkU.addEventListener("click", function(event) {
            event.preventDefault();
            sectionSearchMainU.removeChild(popupAccountContainerU);
        });

        popupAllItemHeaderU.appendChild(removeLinkU);

        const popupAccountItemU = document.createElement("iframe");
        popupAccountItemU.src = linkUpload;

        popupAccountContainerU.appendChild(popupAllItemHeaderU);
        popupAccountContainerU.appendChild(popupAccountItemU);
        sectionSearchMainU.appendChild(popupAccountContainerU);
    }

    const uploadSection3U = document.getElementById("section3");
    const uploadContainerU = document.getElementById("containerToUpload");
    uploadSection3U.innerHTML = `
        <div>
            <p class="p1">G90 Media</p>
            <p class="p2">Upload karya terbaikmu disini</p>
        </div>
    `;
    uploadContainerU.innerHTML = `
        <div class="item-to-upload" id="item1">
            <button><i class="bi bi-plus-circle"></i></button>
            <img src="https://g90nf.kezt.my.id/upload/image/v7iphb.jpg" alt="">
        </div>
        <div class="item-to-upload" id="item2">
            <img src="https://g90nf.kezt.my.id/upload/image/qxc3xm.jpg" alt="">
            <button><i class="bi bi-plus-circle"></i></button>
        </div>
    `;
    uploadSection3U.appendChild(uploadContainerU);
    
    const uploadBagianLayanan = document.createElement("div");
    uploadBagianLayanan.classList.add("bagian-ketentuan-privasi");
    uploadBagianLayanan.innerHTML = `
        <h1><i class="bi bi-book"></i> Layanan ketentuan, dan Privasi</h1>
        <p><h1>Ketentuan Layanan</h1><br>Pendahuluan<br>Dengan menggunakan layanan upload di halaman web G90, Anda setuju untuk mematuhi ketentuan berikut. Jika Anda tidak setuju, harap tidak menggunakan layanan ini.<br><br>Konten yang Dilarang<br>Pengguna dilarang mengunggah konten yang melanggar hukum, melanggar hak kekayaan intelektual pihak ketiga, atau mengandung pornografi, kekerasan, diskriminasi, kebencian, virus, malware, atau perangkat lunak berbahaya.<br><br>Hak atas Konten<br>Dengan mengunggah konten, Anda memberikan G90 hak non-eksklusif untuk menggunakan, menyebarluaskan, dan menampilkan konten tersebut.<br><br>Pembatasan Tanggung Jawab<br>G90 tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan ini.<br><br>Perubahan Ketentuan<br>G90 berhak mengubah ketentuan ini sewaktu-waktu. Penggunaan layanan setelah perubahan berarti Anda setuju dengan ketentuan yang diperbarui.<br><br><h1>Kebijakan Privasi</h1><br><br>Apa itu Kebijakan Privasi?<br>Kebijakan privasi adalah dokumen hukum yang memberikan informasi kepada pengunjung situs tentang bagaimana bisnis mengumpulkan dan mengelola data pribadi yang sensitif dari setiap orang yang berinteraksi dengan bisnis tersebut.<br><br>Informasi yang Kami Kumpulkan<br>Kami mengumpulkan informasi pribadi seperti nama, alamat email, dan informasi lain yang relevan saat Anda menggunakan layanan upload kami.<br><br>Penggunaan Informasi<br>Informasi yang kami kumpulkan digunakan untuk mengelola akun Anda, memberikan dukungan dan layanan pelanggan, meningkatkan kualitas layanan kami, dan mengirimkan pemberitahuan terkait penggunaan layanan.<br><br>Keamanan Informasi<br>Kami berkomitmen untuk melindungi informasi pribadi Anda. Kami menggunakan berbagai tindakan keamanan untuk menjaga informasi Anda tetap aman dari akses, perubahan, atau pengungkapan yang tidak sah.<br><br>Pembagian Informasi<br>Kami tidak akan membagikan informasi pribadi Anda kepada pihak ketiga tanpa izin Anda, kecuali jika diwajibkan oleh hukum atau sebagai bagian dari operasional layanan kami (misalnya, penyedia layanan hosting).<br><br>Akses dan Perubahan Informasi<br>Anda berhak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda yang ada di sistem kami. Untuk melakukan ini, silakan hubungi tim dukungan kami di g90nforganization@gmail.com<br><br>Perubahan Kebijakan Privasi<br>Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diumumkan di situs web kami, dan penggunaan layanan setelah perubahan tersebut berarti Anda menerima kebijakan yang telah diperbarui.<br><br>Hubungi Kami<br>Jika Anda memiliki pertanyaan tentang Ketentuan Penggunaan atau Kebijakan Privasi ini, silakan hubungi kami di g90nforganization@gmail.com</p>
    `;
    
    uploadSection3U.appendChild(uploadBagianLayanan);
    
    document.getElementById("item1").addEventListener("click", function() {
        uploadFileSemua('https://jsksiaokwoeoxnabwijsnsnakwkwk.tiiny.site/book-upload.html');
    });
    document.getElementById("item2").addEventListener("click", function() {
        uploadFileSemua('https://jsksiaokwoeoxnabwijsnsnakwkwk.tiiny.site/index.html');
    });
});



function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}


function markAsRead(notification) {
    notification.classList.remove('unread');
    const circle = notification.querySelector('.circle');
    if (circle) {
        circle.remove();
    }
    const notificationId = notification.getAttribute('data-id');
    setCookie("notification_" + notificationId, "read", 7);
    updateNotificationIcon();
}

// Function to check notifications and update their read status
function checkNotifications() {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        const notificationId = notification.getAttribute('data-id');
        if (getCookie("notification_" + notificationId) === "read") {
            notification.classList.remove('unread');
            const circle = notification.querySelector('.circle');
            if (circle) {
                circle.remove();
            }
        }
    });
    updateNotificationIcon();
}


function updateNotificationIcon() {
    const hasUnread = document.querySelectorAll('.notification.unread').length > 0;
    const icon = document.getElementById('notification-icon');
    if (hasUnread) {
        icon.classList.add('shake');
    } else {
        icon.classList.remove('shake');
    }
}

document.addEventListener('DOMContentLoaded', checkNotifications);




//BagianProfilePrivate
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const responsePK = await fetch(urlDataUser);
        const dataPK = await responsePK.text();

        const rowsPK = dataPK.trim().split("\n").map(rowPK => rowPK.split("\t"));

        const usernameElementsPK = document.querySelectorAll("#containerProfile");

        rowsPK.forEach(rowPK => {
            const userIDPK = rowPK[2]?.trim() || '';
            const userNamePK = rowPK[3]?.trim() || '';
            const userProfilePK = rowPK[5]?.trim() || '';
            const userProfileKeyPK = rowPK[7]?.trim() || '';
            const userCustomBackPK = rowPK[9]?.trim() || '';
            const userCustomLabelPK = rowPK[10]?.trim() || '';
            const userAwardPK = rowPK[8]?.trim() || '';

            const fixedUserNamePK = userNamePK.replace('class"', 'class="');
            const fixedAwardPK = userAwardPK.replace('class"', 'class="');

            const usernameWithProfilePK = `
                <div class="header-profile">
                    <img class="label" src="${userCustomLabelPK}" alt="" oncontextmenu="return false;">
                </div>
                <div class="bagian-profile1">
                    <img src="${userProfilePK}" alt="" oncontextmenu="return false;">
                    <div class="containerName">
                        <h1>${fixedUserNamePK}</h1>
                        <p class="p1">@${userIDPK}</p>
                        <p class="p2">key : ${userProfileKeyPK}</p>
                    </div>
                </div>
                <div class="bagian-profile2">
                    <p>Penghargaan</p>
                    <div>${fixedAwardPK}</div>
                </div>
                <div class="bagian-profile3">
                    <p>Jumlah Postingan : <span id="jumlahPostingan">0</span></p>
                    <div id="contentPK"></div>
                </div>`;

            usernameElementsPK.forEach(elementPK => {
                if (elementPK.innerHTML.includes(userIDPK)) {
                    elementPK.innerHTML = usernameWithProfilePK;
                    elementPK.style.background = `url('${userCustomBackPK}') center / cover`;
                }
            });
        });

        const repoUrl = "https://api.github.com/repos/g90nf/Database/contents/sosialmedia";
        const responseRepo = await fetch(repoUrl);
        const files = await responseRepo.json();

        const contentPK = document.getElementById("contentPK");
        const jumlahPostingan = document.getElementById("jumlahPostingan");

        function getPrefix(filename) {
            const parts = filename.split("$&$");
            if (parts.length > 1) {
                return parts[0];
            }
            return '';
        }

        let countFiles = 0;

        files.forEach(file => {
            const fileUrl = file.download_url;
            const fileName = file.name;

            const prefix = getPrefix(fileName);

            usernameElementsPK.forEach(elementPK => {
                if (elementPK.innerHTML.includes(prefix)) {
                    let fileElement;

                    if (fileUrl.match(/\.(png|jpe?g|gif|webp)$/i)) {
                        fileElement = document.createElement("img");
                        fileElement.src = fileUrl;
                        fileElement.alt = fileName;
			fileElement.oncontextmenu = function() {
        return false;
    };
                    } else if (fileUrl.match(/\.mp4$/i)) {
                        fileElement = document.createElement("video");
                        fileElement.src = fileUrl;
                        fileElement.controls = true;
			fileElement.oncontextmenu = function() {
        return false;
    };
                    }

                    if (fileElement) {
                        fileElement.classList.add("item");
                        contentPK.appendChild(fileElement);
                        countFiles++;
                    }
                }
            });
        });

        jumlahPostingan.textContent = countFiles;

    } catch (errorPK) {
        console.error("Error:", errorPK);
    }
});
