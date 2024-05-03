//Transisi Awal View

function fadeInElements() {
  var fadeUpElements = document.querySelectorAll('[kezt-transition1], [kezt-transition2], [kezt-transition3], [kezt-transition4], [kezt-transition5]');
  fadeUpElements.forEach(function(element) {
    var rect = element.getBoundingClientRect();
    var elementTop = rect.top + window.pageYOffset;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY;
    
    if (elementTop < windowHeight + scrollPosition) {
      if (!element.hasAttribute('kezt-transitioned')) {
        if (element.hasAttribute('kezt-transition1')) {
          element.style.opacity = 1;
          element.style.top = 0;
        } else if (element.hasAttribute('kezt-transition2')) {
          element.style.opacity = 1;
          element.style.left = 0;
        } else if (element.hasAttribute('kezt-transition3')) {
          element.style.opacity = 1;
          element.style.right = 0;
        } else if (element.hasAttribute('kezt-transition4')) {
          element.style.opacity = 1;
          element.style.bottom = 0;
        } else if (element.hasAttribute('kezt-transition5')) {
          element.style.opacity = 1;
        }
        element.setAttribute('kezt-transitioned', 'true');
      }
    }
  });
}

window.addEventListener('scroll', function() {
  fadeInElements();
});

window.onload = function() {
  fadeInElements();
};



//Navigasi

document.addEventListener("DOMContentLoaded", function() {
    const openButton = document.getElementById("opennavigasi");
    const closeButton = document.getElementById("closenavigasi");
    const sidebar = document.getElementById("sidebarnav");
    const menuheader = document.getElementById("menuheader");

    openButton.addEventListener("click", function() {
        sidebar.style.width = "200px";
    });

    closeButton.addEventListener("click", function() {
        sidebar.style.width = "0";
    });
});







