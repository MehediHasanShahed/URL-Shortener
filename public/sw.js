// sw.js - minimal service worker

// Install event (optional, here for completeness)
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installed");
  self.skipWaiting(); // Activate immediately
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activated");
  self.clients.claim(); // Take control of uncontrolled clients
});

// Fetch event - handle navigation requests safely
self.addEventListener("fetch", (event) => {
  // Only handle navigation requests
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Optionally, fallback to an offline page
        return new Response("<h1>Offline</h1><p>Cannot fetch page.</p>", {
          headers: { "Content-Type": "text/html" },
        });
      })
    );
  }
});
