import {User} from 'firebase/auth'
import {useRouter} from 'next/router'
import React, {createContext, useContext, useEffect, useState} from 'react'
import * as Auth from './auth'

// dummy logout, won't be used
const logout = () => {
  return
}

const AuthContext = createContext<UseAuthResult>({
  user: null,
  userId: null,
  isLoading: true,
  logout,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setError: (_: Error | null) => {
    return
  },
  error: null,
})

interface UseAuthResult {
  user: User | null
  userId: string | null
  isLoading: boolean
  logout: () => void
  setError: (error: Error | null) => void
  error: Error | null
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(Auth.getUser())
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribeAuthStateListener = Auth.auth.onAuthStateChanged(
      (user) => {
        setUser(user)
        setIsLoading(false)
      },
    )

    return () => {
      unsubscribeAuthStateListener()
    }
  }, [])

  const logout = async () => {
    await Auth.signOut().then(() => router.push('/'))
  }

  const useAuthResult = {
    user,
    userId: user?.uid || null,
    isLoading,
    logout,
    error,
    setError,
  }

  return (
    <AuthContext.Provider value={useAuthResult}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
