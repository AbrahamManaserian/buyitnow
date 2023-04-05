import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcDlLw-qOBM_2A5GFOU5YhEMg-yOzg-5o',
  authDomain: 'buyitnow-df936.firebaseapp.com',
  projectId: 'buyitnow-df936',
  storageBucket: 'buyitnow-df936.appspot.com',
  messagingSenderId: '366940509424',
  appId: '1:366940509424:web:161829052f885d7a7b5e35',
  measurementId: 'G-YCH8X40DNK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default getFirestore();
export const auth = getAuth(app);
