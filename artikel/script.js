function showOnScroll() {
    const kezttransition1 = document.querySelectorAll('[kezttransition1]');
    kezttransition1.forEach(function(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });

    const kezttransition2 = document.querySelectorAll('[kezttransition2]');
    kezttransition2.forEach(function(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        element.style.opacity = 1;
        element.style.transform = 'translateX(0)';
      }
    });
    
    const kezttransition3 = document.querySelectorAll('[kezttransition3]');
    kezttransition3.forEach(function(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        element.style.opacity = 1;
        element.style.transform = 'translateX(0)';
      }
    });
    
    const kezttransition4 = document.querySelectorAll('[kezttransition4]');
    kezttransition4.forEach(function(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', showOnScroll);
  window.addEventListener('DOMContentLoaded', showOnScroll);



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







