import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: "devhive-2230d.appspot.com",
	messagingSenderId: "534531593324",
	appId: "1:534531593324:web:c73cf5a3c14b34a3cc3449",
	measurementId: "G-J1Y3J654MY",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const myFirebaseStorage = getStorage(firebaseApp);
// export const myFirebaseMessaging = getMessaging(firebaseApp);
