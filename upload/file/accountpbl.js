document.addEventListener("DOMContentLoaded", async function() {
    const urlDataUser = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSbc66HXqX8MQVkBUR_I4-Z0zLJMpft1WcPcSuWhZmOooDN0QlEtA8D-g9JmGlNuisyIhWgWB3DWe36/pub?output=tsv";

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
                    </div>
                    <button class="button-untuk-follow" id="toggleFollowBtn-${userIDPK}" onclick="toggleFollow('${userIDPK}')">Follow</button>
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

        // Set initial button states based on cookies
        usernameElementsPK.forEach(elementPK => {
            const userId = elementPK.querySelector(".p1").textContent.slice(1); // Get userID
            updateButtonDisplay(userId);
        });

        // Refresh every 1 second to keep cookie state updated
        setInterval(() => {
            usernameElementsPK.forEach(elementPK => {
                const userId = elementPK.querySelector(".p1").textContent.slice(1); // Get userID
                updateButtonDisplay(userId);
            });
        }, 1000);

    } catch (errorPK) {
        console.error("Error:", errorPK);
    }
});

function toggleFollow(userId) {
    if (isFollowing(userId)) {
        deleteFollowCookie(userId);
    } else {
        setFollowCookie(userId);
    }
}

function setFollowCookie(userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // Set cookie expiry date 30 days from now
    const expiryDateString = expiryDate.toUTCString();
    
    document.cookie = `follow-${userId}=true; expires=${expiryDateString}; path=/`;
    updateButtonDisplay(userId);
    sistem.message.log("Mengikuti" + userId);
}

function deleteFollowCookie(userId) {
    document.cookie = `follow-${userId}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    updateButtonDisplay(userId);
    sistem.message.log("Bergenti mengikuti" + userId);
}

function isFollowing(userId) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === `follow-${userId}` && cookieValue === 'true') {
            return true;
        }
    }
    return false;
}

function updateButtonDisplay(userId) {
    let btn = document.getElementById(`toggleFollowBtn-${userId}`);
    if (btn) {
        if (isFollowing(userId)) {
            btn.textContent = 'Unfollow ✓';
        } else {
            btn.textContent = 'Follow +';
        }
    }
}
