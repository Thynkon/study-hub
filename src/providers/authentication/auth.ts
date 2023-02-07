import { useFirebaseAuth } from 'vuefire';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const auth = useFirebaseAuth();

export default class AuthProvider {
  public static async register(email: string, password: string) {
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
        // TODO: Display error in the view
      });
  }

  public static async login(email: string, password: string) {
    signInWithEmailAndPassword(auth!, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        auth!.updateCurrentUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // TODO: Display error in the view
      });
  }

  public static async logout() {
    signOut(auth!)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
