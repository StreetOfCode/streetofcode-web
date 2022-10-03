export type ThemeType = {
  type: 'LIGHT' | 'DARK'
  primaryColor: string // mostly background
  secondaryColor: string // mostly text color
  accentColor: string // button colors, heading underline colors, icon colors
  greyColor: string // helper texts, etc.
  dangerColor: string // error texts, i.e in TextField or incorrect quiz question
  successColor: string // i.e correct quiz question
  footerBackgroundColor: string
  shadowColor: string
}

export const lightTheme: ThemeType = {
  type: 'LIGHT',
  primaryColor: 'white',
  secondaryColor: '#212121',
  accentColor: '#7E50E6',
  greyColor: '#545454',
  dangerColor: '#CB2041',
  successColor: '#4CBF6B',
  footerBackgroundColor: '#212121',
  shadowColor: 'rgba(0,0,0,0.2)',
}

export const darkTheme: ThemeType = {
  type: 'DARK',
  primaryColor: '#212121',
  secondaryColor: '#efefef',
  accentColor: '#7E50E6',
  greyColor: '#545454',
  dangerColor: '#CB2041',
  successColor: '#4CBF6B',
  footerBackgroundColor: '#efefef',
  shadowColor: 'rgba(255,255,255,0.2)',
}
