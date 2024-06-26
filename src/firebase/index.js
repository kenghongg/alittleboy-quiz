import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LocalStorage } from 'quasar';

const firebaseConfig = {
  // apiKey: 'AIzaSyCepDJ1Q4AeB9tLTDCRSco1hR_e_g9TNgQ',
  // authDomain: 'alittleboy-quiz.firebaseapp.com',
  // projectId: 'alittleboy-quiz',
  // storageBucket: 'alittleboy-quiz.appspot.com',
  // messagingSenderId: '887418266262',
  // appId: '1:887418266262:web:f557ea0e1e70ea44ded8b7',
  // measurementId: 'G-RTJQ58FF8Y'

  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set('user', user);
  } else {
    LocalStorage.remove('user');
  }
});
