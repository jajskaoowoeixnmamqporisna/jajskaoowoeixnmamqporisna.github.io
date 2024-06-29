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
                                         <div class="container-name">
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
    const groupElementMenuTop = document.getElementsByClassName("profile-baca-buku-group1");
    
    const firstGroupElement = groupElementMenuTop[0];
    
    firstGroupElement.innerHTML = `
        <a class="button-share"id="loveButton" onclick="loveButton()"><i class="bi bi-heart-fill"></i></a>
        <a class="button-share" onclick="shareButton()"><i class="bi bi-share-fill"></i></a>
        <a class="button-share" onclick="reportButton()"><i class="bi bi-flag-fill"></i></a>
    `;
});

function shareButton() {
    if (navigator.share) {
        var shareUrl = window.location.href;
        const nameBook = document.getElementById('nameBook').textContent;
        const genreBook = document.getElementById('genreBook').textContent;
        const languageBook = document.getElementById('languangeBook').textContent;
        
        navigator.share({
            title: 'G90 Kreatif - Book',
            text: `G90 Kreatif - Book\nAyo baca buku ini, pasti kamu akan suka!\nJudul Buku: ${shareJudulBuku}\nAuthor: ${shareAuthorBuku}\nLink: ${shareUrl}`,
        })
        .then(() => console.log('Berbagi berhasil'))
        .catch((error) => console.log('Gagal berbagi', error));
    } else {
        sistem.message.log('Browser Tidak Mendukung');
    }
}

function loveButton() {
    const loveButton = document.getElementById("loveButton");
    if (loveButton.style.color === "red") {
        loveButton.style.color = "white";
    } else {
        loveButton.style.color = "red";
    }
}

function reportButton() {
    const reportText1 = prompt("Apa laporan anda?");
    const urlWeb = encodeURIComponent(window.location.href);
    const codeAcak = generateRandomString(getRandomLength(17, 30));
    window.location.href = "https://wa.me/6285768019887/?text=" + "*Laporan Hari Ini :*" + "%0A%0A" + "Laporan : " + reportText1 + "%0A" + "Halaman Web : " + urlWeb + "%0A" + "Code : " + codeAcak;
}


function getRandomLength(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return randomString;
}