import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Ganti nilai di bawah ini dengan config dari Firebase Console Anda nanti
const firebaseConfig = {
  apiKey: "AIzaSyCA8IlBAuMTx7WJU3liiStw0xJxBTRheCs",
  authDomain: "pengmas-tel-u-26.firebaseapp.com",
  databaseURL: "https://pengmas-tel-u-26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pengmas-tel-u-26",
  storageBucket: "pengmas-tel-u-26.firebasestorage.app",
  messagingSenderId: "749783497398",
  appId: "1:749783497398:web:29eef957423083e97a4417",
  measurementId: "G-8B7BTPR5HD"
};
// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Auth & Database secara standar (Aman dan bebas error merah)
export const auth = getAuth(app);
export const database = getDatabase(app);