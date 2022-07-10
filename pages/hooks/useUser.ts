import {User} from 'firebase/auth'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import * as Auth from '../../auth'

interface UseUserResult {
  user: User | null;
  userId: string | null;
  isLoading: boolean;
  logout: () => void
}

const useUser = (): UseUserResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(Auth.getUser())
  const router = useRouter()

  useEffect(() => {
    const unsubscribeAuthStateListener = Auth.auth.onAuthStateChanged((v) => {
      setUser(v)
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

  return {user, userId: user?.uid || null, isLoading, logout}
}

export default useUser
