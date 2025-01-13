import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBqERf339BL4OIXfx4NXvY_-ZjZsH7N2OY",
  authDomain: "nukkad-deb3b.firebaseapp.com",
  projectId: "nukkad-deb3b",
  storageBucket: "nukkad-deb3b.firebasestorage.app",
  messagingSenderId: "158653924415",
  appId: "1:158653924415:web:7c4f0a10f58cb33397248a",
  measurementId: "G-XH0RHTSXZW",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BIyuB12perX-qVRU3AYj3OPOBoihnSRpa-1erYATzgwQeMCcPuKuMvz-mg9KlwoYeOfGGl41k00EdJ9lUgl31z8",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
