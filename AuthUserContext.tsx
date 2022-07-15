import {User} from 'firebase/auth'
import {useRouter} from 'next/router'
import React, {createContext, useContext, useEffect, useState} from 'react'
import * as Auth from './auth'

// dummy logout TODO
const logout = () => {
  return
}

const AuthContext = createContext<UseAuthResult>({
  user: null,
  userId: null,
  isLoading: true,
  logout,
})

interface UseAuthResult {
  user: User | null;
  userId: string | null;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(Auth.getUser())
  const router = useRouter()

  useEffect(() => {
    const unsubscribeAuthStateListener = Auth.auth.onAuthStateChanged((user) => {
      setUser(user)
      setIsLoading(false)
    })

    return () => {
      unsubscribeAuthStateListener()
    }
  }, [])

  const logout = async () => {
    await Auth.signOut()
      .then(() => router.replace('/'))
  }

  const useAuthResult = {user, userId: user?.uid || null, isLoading, logout}

  return (<AuthContext.Provider value={useAuthResult}>
    {children}
  </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext)
