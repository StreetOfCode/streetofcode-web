import React, {useContext} from 'react'
import clsx from 'clsx'
import ThemeSwitchingContext from '../ThemeSwitchingContext'

type Props = {
  className?: string
  difficultyLevel: number
}

const DifficultyIcon = ({className, difficultyLevel}: Props) => {
  const {theme} = useContext(ThemeSwitchingContext)

  const classNames = clsx('feather feather-bar-chart', className)
  const greyDiffcultyBackgroundColor = theme.greyColor

  return (<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke={greyDiffcultyBackgroundColor}
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={classNames}
  >
    <line
      x1="6"
      y1="20"
      x2="6"
      y2="16"
      stroke={difficultyLevel >= 1 ? 'currentColor' : greyDiffcultyBackgroundColor}
    />
    <line
      x1="12"
      y1="20"
      x2="12"
      y2="10"
      stroke={difficultyLevel >= 2 ? 'currentColor' : greyDiffcultyBackgroundColor}
    />
    <line
      x1="18"
      y1="20"
      x2="18"
      y2="4"
      stroke={difficultyLevel >= 3 ? 'currentColor' : greyDiffcultyBackgroundColor}
    />
  </svg>)
}

export default DifficultyIcon
