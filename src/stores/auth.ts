import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useFirebaseAuth } from 'vuefire';
import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signOut } from '@firebase/auth';

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

  async function register(register: Function) {
    try {
      const user = await register();

      // Add document to users collection with specific document id
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
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
