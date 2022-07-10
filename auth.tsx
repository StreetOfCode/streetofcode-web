import React, {useState, useEffect, useContext, createContext} from 'react'
import {getAuth,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  signInWithRedirect,
  User} from 'firebase/auth'
import nookies from 'nookies'
import {firebase} from './firebaseClient'

const AuthContext = createContext<{ user: User | null }>({
  user: null,
})

export function AuthProvider({children}: any) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).nookies = nookies
    }
    return getAuth(firebase.getApp()).onIdTokenChanged(async (user) => {
      console.log('token changed!')
      if (!user) {
        console.log('no token found...')
        setUser(null)
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', {path: '/'})
        return
      }

      console.log('updating token...')
      const token = await user.getIdToken()
      setUser(user)
      nookies.destroy(null, 'token')
      nookies.set(null, 'token', token, {path: '/'})
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log('refreshing token...')
      const user = getAuth(firebase.getApp()).currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  return useContext(AuthContext)
}

// export const auth = getAuth(firebase)
// auth.setPersistence(browserLocalPersistence)

// export const googleProvider = new GoogleAuthProvider()
// export const githubProvider = new GithubAuthProvider()

// export const getUser = () => auth.currentUser

// export const getToken = async () => await getUser()?.getIdToken()

// export const getUserAfterRedirect = async () => {
//   return (await getRedirectResult(auth))?.user
// }

// export const signOut = async () => await auth.signOut()

// export const loginWithGoogle = () => {
//   signInWithRedirect(auth, googleProvider)
// }

// export const loginWithGithub = () => {
//   signInWithRedirect(auth, githubProvider)
// }


