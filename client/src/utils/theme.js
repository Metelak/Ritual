import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme({
  fonts: {
    heading: 'Truculenta, sans-serif'
  },
  breakpoints
})

export default theme