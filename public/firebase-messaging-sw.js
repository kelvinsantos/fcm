importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCx8DoYTJA8vPdD2Aybun8NYEEFECEuzNs",
  authDomain: "dsvs-as.firebaseapp.com",
  projectId: "dsvs-as",
  storageBucket: "dsvs-as.firebasestorage.app",
  messagingSenderId: "481434658240",
  appId: "1:481434658240:web:7881ee65cd7c42630ad425",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  if (Notification.permission === "granted") {
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: "/firebase-logo.png",
    });
  } else {
    console.error("Notification permission not granted.");
  }
});
