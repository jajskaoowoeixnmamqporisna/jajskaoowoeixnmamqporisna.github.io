document.addEventListener("DOMContentLoaded", function() {
    const NavKreatif = document.createElement("div");
    NavKreatif.className = "bottom-nav";
    NavKreatif.innerHTML = `
        <div class="navigasibawah">
            <ul>
                <li><a href="index.html" class="buttonhoverkreatif1"><i class="bi bi-house"></i></a><span>Home</span></li>
                <li><a href="book.html" class="buttonhoverkreatif1"><i class="bi bi-book"></i></a><span>Book</span></li>
                <li><a href="add.html" class="buttonhoverkreatif1"><i class="bi bi-plus-circle"></i></a><span>Upload</span></li>
                <li><a href="film.html" class="buttonhoverkreatif1"><i class="bi bi-film"></i></a><span>Film</span></li>
                <li><a href="media.html" class="buttonhoverkreatif1"><i class="bi bi-camera"></i></a><span>Media</span></li>
            </ul>
        </div>
        <nav id="navigasiGeser">
            <div class="nav-content">
                <div id="navigasiGeserPlus" class="toggle-btn">
                    <i class='bi bi-plus'></i>
                </div>
                <span style="--i:1;">
                    <a href="index.html"><i class='bi bi-house'></i></a>
                </span>
                <span style="--i:2;">
                    <a href="book.html"><i class='bi bi-book'></i></a>
                </span>
                <span style="--i:3;">
                    <a href="add.html"><i class='bi bi-plus' ></i></a>
                </span>
                <span style="--i:4;">
                    <a href="film.html"><i class='bi bi-film' ></i></a>
                </span>
                <span style="--i:5;">
                    <a href="media.html"><i class='bi bi-camera' ></i></a>
                </span>
            </div>
        </nav>
    `;
    
    document.body.appendChild(NavKreatif);
    
    var navigasiGeserPlus = document.getElementById("navigasiGeserPlus");
    var navigasiGeser = document.getElementById("navigasiGeser");
    var startX, startY;

    navigasiGeserPlus.addEventListener("touchstart", function(event) {
        startX = event.touches[0].clientX - navigasiGeser.offsetLeft;
        startY = event.touches[0].clientY - navigasiGeser.offsetTop;
        
        document.addEventListener("touchmove", touchmove);
        document.addEventListener("touchend", touchend);
    });
    
    function touchmove(event) {
        event.preventDefault();
        var newX = event.touches[0].clientX - startX;
        var newY = event.touches[0].clientY - startY;
        
        navigasiGeser.style.left = newX + "px";
        navigasiGeser.style.top = newY + "px";
    }
    
    function touchend() {
        document.removeEventListener("touchmove", touchmove);
        document.removeEventListener("touchend", touchend);
    }
    
    const nav = document.querySelector("nav"),
    toggleBtn = nav.querySelector(".toggle-btn");

    toggleBtn.addEventListener("click" , () =>{
        nav.classList.toggle("open");
    });

    function onDrag({movementY}) {
        const navStyle = window.getComputedStyle(nav),
              navTop = parseInt(navStyle.top),
              navHeight = parseInt(navStyle.height),
              windHeight = window.innerHeight;

        nav.style.top = navTop > 0 ? `${navTop + movementY}px` : "1px";
        if(navTop > windHeight - navHeight){
            nav.style.top = `${windHeight - navHeight}px`;
        }
    }

    nav.addEventListener("mousedown", () =>{
        nav.addEventListener("mousemove", onDrag);
    });

    nav.addEventListener("mouseup", () =>{
        nav.removeEventListener("mousemove", onDrag);
    });
    nav.addEventListener("mouseleave", () =>{
        nav.removeEventListener("mousemove", onDrag);
    });
    
    function showFullText(element) {
        alert(element.innerText);
    }
});

