import { useFirebaseAuth } from 'vuefire';
import {
  signInWithRedirect,
  GithubAuthProvider,
  getRedirectResult,
} from 'firebase/auth';

const auth = useFirebaseAuth();
const provider = new GithubAuthProvider();

export default class GithubProvider {
  public static async signIn() {
    await signInWithRedirect(auth!, provider);
    // This will trigger a full page redirect away from your app

    // After returning from the redirect when your app initializes you can obtain the result
    const result = await getRedirectResult(auth!);
    if (result) {
      // This is the signed-in user
      const user = result.user;
      console.log(user);

      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      auth?.updateCurrentUser(user);
    }
  }
}
