importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBqERf339BL4OIXfx4NXvY_-ZjZsH7N2OY",
  authDomain: "nukkad-deb3b.firebaseapp.com",
  projectId: "nukkad-deb3b",
  storageBucket: "nukkad-deb3b.firebasestorage.app",
  messagingSenderId: "158653924415",
  appId: "1:158653924415:web:7c4f0a10f58cb33397248a",
  measurementId: "G-XH0RHTSXZW",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
