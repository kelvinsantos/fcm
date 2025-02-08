// Import Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCx8DoYTJA8vPdD2Aybun8NYEEFECEuzNs",
  authDomain: "dsvs-as.firebaseapp.com",
  projectId: "dsvs-as",
  storageBucket: "dsvs-as.firebasestorage.app",
  messagingSenderId: "481434658240",
  appId: "1:481434658240:web:7881ee65cd7c42630ad425",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Request permission and get the device token
async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await messaging.getToken({
        vapidKey:
          "BGuwNaKlkitVoLYTyUsDF_yHLYbQT1_6m6X6en5RytGuFIsdo6ZV0PMSWWWL07fea1p5DZTDPBGwiTxJT6fNK5Q",
      });

      if (token) {
        console.log("Device Token:", token);
        document.getElementById("deviceToken").value = token;
      } else {
        console.warn("No registration token available.");
      }
    } else {
      console.warn("Permission denied for notifications.");
    }
  } catch (error) {
    console.error("Error getting device token:", error);
  }
}

// Bind the button click event
document
  .getElementById("getTokenBtn")
  .addEventListener("click", requestNotificationPermission);

// Register the service worker for background notifications
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
