export type ThemeType = {
  type: 'LIGHT' | 'DARK'
  primaryColor: string // mostly background
  secondaryColor: string // mostly text color
  accentColor: string // button colors, heading underline colors, icon colors
  greyColor: string // helper texts, etc.
  dangerColor: string // error texts, i.e in TextField or incorrect quiz question
  successColor: string // i.e correct quiz question
}

export const lightTheme: ThemeType = {
  type: 'LIGHT',
  primaryColor: 'white',
  secondaryColor: 'black',
  accentColor: '#7E50E6',
  greyColor: '#545454',
  dangerColor: '#CB2041',
  successColor: '#4CBF6B',
}

export const darkTheme: ThemeType = {
  type: 'DARK',
  primaryColor: '#121212',
  secondaryColor: 'white',
  accentColor: '#7E50E6',
  greyColor: '#545454',
  dangerColor: '#CB2041',
  successColor: '#4CBF6B',
}
