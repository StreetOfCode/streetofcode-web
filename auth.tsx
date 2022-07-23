import {getAuth,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithRedirect} from 'firebase/auth'
import {firebase} from './firebase'

export const auth = getAuth(firebase)
auth.setPersistence(browserLocalPersistence)

export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()

export const getUser = () => auth.currentUser

export const getToken = async () => await getUser()?.getIdToken()

export const getRedirectResults = async () => await getRedirectResult(auth)

export const signOut = async () => await auth.signOut()

export const loginWithGoogle = () => {
  signInWithRedirect(auth, googleProvider)
}

export const loginWithGithub = () => {
  signInWithRedirect(auth, githubProvider)
}
