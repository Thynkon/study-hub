import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire';
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

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth!, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        auth!.updateCurrentUser(user);
      })
      .catch((error) => {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;

        loginErrors.value = [{ $message: errorMessage }];
      });
  }

  async function register(email: string, password: string) {
    createUserWithEmailAndPassword(auth!, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        auth!.updateCurrentUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
        registerErrors.value = [{ $message: errorMessage }];
      });
  }

  async function logout() {
    signOut(auth!)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return { login, register, loginErrors, registerErrors, Error };
});