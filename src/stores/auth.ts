import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useFirebaseAuth } from 'vuefire';
import { db } from '@/firebase';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const auth = useFirebaseAuth();

export type Error = {
  $message: string;
};

export const useAuthStore = defineStore('auth', () => {
  const loginErrors = ref<Error[]>([]);
  const registerErrors = ref<Error[]>([]);

  async function login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth!,
        email,
        password
      );

      const user = userCredential.user;
      auth!.updateCurrentUser(user);
    } catch (error) {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;

      loginErrors.value = [{ $message: errorMessage }];
      throw error;
    }
  }

  async function register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth!,
        email,
        password
      );

      const user = userCredential.user;
      auth!.updateCurrentUser(user);

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;

      registerErrors.value = [{ $message: errorMessage }];
      throw error;
    }
  }

  async function logout() {
    signOut(auth!);
  }

  return { login, register, loginErrors, registerErrors, Error };
});
