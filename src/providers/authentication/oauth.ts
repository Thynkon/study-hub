import { useFirebaseAuth } from 'vuefire';
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

type providers = GoogleAuthProvider | GithubAuthProvider;

const auth = useFirebaseAuth();

export default class OAuthProvider {
  public static async auth(provider: providers) {
    return async () => {
      // This will trigger a full page redirect away from your app
      await signInWithRedirect(auth!, provider);

      // After returning from the redirect when your app initializes you can obtain the result
      const result = await getRedirectResult(auth!);

      if (result) {
        // This is the signed-in user
        const user = result.user;

        auth?.updateCurrentUser(user);

        if (getAdditionalUserInfo(result)?.isNewUser) {
          await addDoc(collection(db, 'users'), {
            uid: user.uid,
            email: user.email,
          });
        }
      }
    };
  }
}
