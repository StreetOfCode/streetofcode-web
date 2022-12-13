import {useEffect} from 'react'

export const useKeyListener = (
  key: KeyboardEvent['key'],
  action: () => void,
) => {
  useEffect(() => {
    const onKeyPressed = (e: KeyboardEvent) => e.key === key && action()
    document.body.addEventListener('keydown', onKeyPressed)
    return () => {
      document.body.removeEventListener('keydown', onKeyPressed)
    }
  }, [action])
}
