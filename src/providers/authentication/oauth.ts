import { useFirebaseAuth } from 'vuefire';
import {
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

type providers = GoogleAuthProvider | GithubAuthProvider;

const auth = useFirebaseAuth();

export default class OAuthProvider {
  public static async signIn(provider: providers) {
    // This will trigger a full page redirect away from your app
    await signInWithRedirect(auth!, provider);

    // After returning from the redirect when your app initializes you can obtain the result
    const result = await getRedirectResult(auth!);

    if (result) {
      // This is the signed-in user
      const user = result.user;

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      auth?.updateCurrentUser(user);
    }
  }
}