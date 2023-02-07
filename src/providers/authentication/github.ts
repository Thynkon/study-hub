import { GithubAuthProvider } from 'firebase/auth';
import OAuthProvider from './oauth';

const provider = new GithubAuthProvider();

export default class GithubProvider extends OAuthProvider {
  public static async signIn() {
    await super.signIn(provider);
  }
}
