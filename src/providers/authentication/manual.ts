import { updateCurrentUserProfile, useFirebaseAuth } from 'vuefire';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const auth = useFirebaseAuth();

export default class AuthProvider {
  public static async login(email: string, password: string) {
    return async () => {
      const userCredential = await signInWithEmailAndPassword(
        auth!,
        email,
        password
      );

      const user = userCredential.user;
      auth!.updateCurrentUser(user);
    };
  }

  public static async register(name: string, email: string, password: string) {
    return async () => {
      const userCredential = await createUserWithEmailAndPassword(
        auth!,
        email,
        password
      );
      const user = userCredential.user;

      await updateCurrentUserProfile({ displayName: name });
      await auth!.updateCurrentUser(user);

      return user;
    };
  }
}
