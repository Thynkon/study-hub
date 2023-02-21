import { GoogleAuthProvider } from 'firebase/auth';
import OAuthProvider from './oauth';

const provider = new GoogleAuthProvider();

export default class GithubProvider extends OAuthProvider {
  public static async signIn() {
    await super.signIn(provider);
  }
}
