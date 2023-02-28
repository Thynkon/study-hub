import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useFirebaseAuth } from 'vuefire';
import { db } from '@/firebase';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';

import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = useFirebaseAuth();

export type Error = {
  $message: string;
};

export const useAuthStore = defineStore('auth', () => {
  const loginErrors = ref<Error[]>([]);
  const registerErrors = ref<Error[]>([]);

  async function login(login: Function) {
    try {
      await login();
    } catch (error) {
      loginErrors.value = [{ $message: error.message }];
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
      registerErrors.value = [{ $message: error.message }];
      throw error;
    }
  }

  async function logout() {
    await signOut(auth!);
  }

  return { login, register, logout, loginErrors, registerErrors, Error };
});
