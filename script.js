// Performance Monitoring
if (window.performance && window.performance.mark) {
  performance.mark("app-start");
}

// Mobile Menu Toggle - Optimized with Event Delegation
function initializeMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const closeBtn = document.getElementById("closeBtn");

  if (!menuToggle || !mobileSidebar) return;

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    mobileSidebar.classList.toggle("active");
    document.body.style.overflow = mobileSidebar.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    mobileSidebar.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  menuToggle.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", closeMenu);

  // Event delegation for mobile nav links
  document.addEventListener("click", (e) => {
    if (e.target.closest(".mobile-nav a, .mobile-auth a")) {
      closeMenu();
    }
    if (e.target === mobileSidebar) {
      closeMenu();
    }
  });
}

// Initialize map only if it exists and Leaflet is loaded
function initializeMap() {
  if (typeof L === "undefined" || !document.getElementById("map")) return;

  try {
    var map = L.map("map").setView([25.6156, 85.1152], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    var marker = L.marker([25.6156, 85.1152]).addTo(map);
    marker.bindPopup("New Report: Water Leakage").openPopup();
  } catch (e) {
    console.warn("Map initialization error:", e);
  }
}

// Defer non-critical initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    initializeMenu();
    // Defer map initialization to allow browser to focus on rendering
    if (document.hidden) {
      document.addEventListener("visibilitychange", initializeMap, {
        once: true,
      });
    } else {
      setTimeout(initializeMap, 500);
    }
  });
} else {
  initializeMenu();
  setTimeout(initializeMap, 500);
}

// Performance Monitoring - Report metrics
if (
  window.performance &&
  window.performance.mark &&
  window.performance.measure
) {
  window.addEventListener("load", function () {
    performance.mark("app-end");
    performance.measure("app-duration", "app-start", "app-end");

    // Log Web Vitals
    const perfData = performance.getEntriesByType("navigation")[0];
    if (perfData) {
      console.log("Performance Metrics:", {
        DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
        TCP: perfData.connectEnd - perfData.connectStart,
        Request: perfData.responseStart - perfData.requestStart,
        Response: perfData.responseEnd - perfData.responseStart,
        "DOM Processing": perfData.domComplete - perfData.domLoading,
        "Total Load Time": perfData.loadEventEnd - perfData.fetchStart,
      });
    }
  });
}


// ONCLICK HANDLER FOR ISSUE REPORT BUTTON

let reportBtn = document.querySelector(".issue-report-btn");

reportBtn.addEventListener("click", function() {
  window.location.href = "/html/report.html";
})
