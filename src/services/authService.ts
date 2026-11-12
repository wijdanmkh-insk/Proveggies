import { auth } from './firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

// Fungsi untuk Mendaftar (Register)
export const daftarDenganEmail = async (email: string, password: string) => {
  try {
    const kredensial = await createUserWithEmailAndPassword(auth, email, password);
    return kredensial.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Fungsi untuk Masuk (Login)
export const masukDenganEmail = async (email: string, password: string) => {
  try {
    const kredensial = await signInWithEmailAndPassword(auth, email, password);
    return kredensial.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};