import palette from "./colorPalette"

export default {

  palette: {
    primary: {
      light: palette.blue.blueLight,
      main: palette.blue.blueMain,
      dark: palette.blue.blueDark
    },
    primary1Color: palette.blue.blueLight,
    primary2Color: palette.blue.blueMain,
    primary3Color: palette.blue.blueDark,

    secondary: {
      light: palette.indigo.indigoLight,
      main: palette.indigo.indigoMain,
      dark: palette.indigo.indigoDark
    },
    secondary1Color: palette.indigo.indigoLight,
    secondary2Color: palette.indigo.indigoMain,
    secondary3Color: palette.indigo.indigoDark,

    accent: {
      light: palette.amber.amberLight,
      main: palette.amber.amberMain,
      dark: palette.amber.amberDark
    },
    accent1Color: palette.amber.amberLight,
    accent2Color: palette.amber.amberMain,
    accent3Color: palette.amber.amberDark,

    success: {
      light: palette.green.greenLight,
      main: palette.green.greenMain,
      dark: palette.green.greenDark
    },
    success1Color: palette.green.greenLight,
    success2Color: palette.green.greenMain,
    success3Color: palette.green.greenDark,

    risk: {
      light: palette.red.redLight,
      main: palette.red.redMain,
      dark: palette.red.redDark
    },
    risk1Color: palette.red.redLight,
    risk2Color: palette.red.redMain,
    risk3Color: palette.red.redDark,

    grey: {
      lightest: palette.grey.greyLightest,
      lighter: palette.grey.greyLighter,
      light: palette.grey.greyLight,
      main: palette.grey.greyMain,
      dark: palette.grey.greyDark,
      darker: palette.grey.greyDarker,
      darkest: palette.grey.greyDarkest
    },
    grey1Color: palette.grey.greyLightest,
    grey2Color: palette.grey.greyLighter,
    grey3Color: palette.grey.greyLight,
    grey4Color: palette.grey.greyMain,
    grey5Color: palette.grey.greyDark,
    grey6Color: palette.grey.greyDarker,
    grey7Color: palette.grey.greyDarkest,

    white: palette.white,
    black: palette.black,

    textColor: palette.grey.greyMain,
    alternateTextColor: palette.white,
    textColorLight: palette.grey.greyLight,
    textColorLighter: palette.grey.greyLighter,
    textColorLightest: palette.grey.greyLightest,
    textColorDark: palette.grey.greyDark,
    textColorDarker: palette.grey.greyDarker,
    textColorDarkest: palette.grey.greyDarkest,

    canvasColor: palette.white,

    borderColor: palette.white,
    border1Color: palette.grey.greyLightest,
    border2Color: palette.grey.greyLighter,
    border3Color: palette.grey.greyLight,


    disabledColor: palette.grey.greyLighter,
    pickerHeaderColor: palette.blue.blueMain,
    shadowColor: palette.black,

  },

  textField: {
    textColor: palette.grey.greyDark,
    hintColor: palette.amber.amberMain,
    floatingLabelColor: palette.grey.greyLight,
    disabledTextColor: palette.grey.greyLighter,
    errorColor: palette.red.redMain,
    focusColor: palette.grey.greyDark,
    borderColor: palette.grey.greyDark,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800,
    }
  },

  typography: {
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
    fontWeightBolder: '900',

    display4: {
      fontSize: '2.4rem',
      fontWeight: 300,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.14286',
      color: palette.grey.greyMain,
    },
    display3: {
      fontSize: '2.0rem',
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.30357',
      color: palette.grey.greyMain,
    },
    display2: {
      fontSize: '1.8rem',
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.06667',
      color: palette.grey.greyMain,
    },
    display1: {
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.20588',
      color: palette.grey.greyMain,
    },
    headline: {
      fontSize: '2.0rem',
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.35417',
      color: palette.grey.greyMain,
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: 500,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.16667',
      color: palette.grey.greyMain,
    },
    subheading: {
      fontSize: "1.6rem",
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.16667',
      color: palette.grey.greyMain,
    },
    caption: {
      fontSize: "1.4rem",
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.375',
      color: palette.grey.greyMain,
    },
    body2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.5',
      color: palette.grey.greyMain,
    },
    body1: {
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.5',
      color: palette.grey.greyMain,
    },
    html: {
      fontSize: 10,
    },
    body: {
      //fontSize: '1.4rem',
      fontWeight: 400,
      fontFamily: 'Roboto, sans-serif',
      lineHeight: '1.5',
      color: palette.grey.greyMain,
      backgroundColor: palette.grey.greyLightest,
      '& #size-calculator-width-span': {
        left: 0,
        bottom: 0,
      }
    },

    h1: {
      //fontSize: '2.4rem',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    h2: {
      //fontSize: '2.2rem',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    h3: {
      //fontSize: '2.0rem',
      fontWeight: 'bold',
      lineHeight: '1.2'
    },
    h4: {
      //fontSize: '1.8rem',
      fontWeight: 'bold',
      lineHeight: '1.4'
    },
    h5: {
      //fontSize: '1.6rem',
      fontWeight: 'bold',
      lineHeight: '1.4'
    },
    h6: {
      //fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: '1.4'
    },
    button: {
      //fontSize: '1.5rem',
      fontWeight: '400',
      lineHeight: 'auto',
      letterSpacing: '2px',
      borderRadius: '6px',
      focus: 'none',
      outline: 'none',
    },
    a: {
      textDecoration: 'none',
      color: palette.amber.amberMain,
      '&:hover': {
        textDecoration: 'underline',
        color: palette.amber.amberDark,
      },
      '&:focus': {
        textDecoration: 'none',
        color: palette.amber.amberDarkest,
        outline: 'none',
      }
    }
  },

  //---------------------------------

  typographyXL: {

    fontSize: '18px',

    display4: { fontSize: '3.6rem' },
    display3: { fontSize: '3.0rem' },
    display2: { fontSize: '2.4rem' },
    display1: { fontSize: '2.0rem' },

    headline: { fontSize: '3.0rem' },
    title: { fontSize: "2.4rem" },
    subheading: { fontSize: "2.0rem" },

    body2: { fontSize: '1.8rem' },
    body1: { fontSize: '1.8rem' },
    body: { fontSize: '1.8rem' },

    h1: { fontSize: '4.8rem' },
    h2: { fontSize: '4.2rem' },
    h3: { fontSize: '3.6rem' },
    h4: { fontSize: '3.0rem' },
    h5: { fontSize: '2.4rem' },
    h6: { fontSize: '2.0rem' },

    button: { fontSize: '1.8rem' }

  },

  //---------------------------------

  typographyLG: {

    fontSize: '18px',

    display4: { fontSize: '3.0rem' },
    display3: { fontSize: '2.4rem' },
    display2: { fontSize: '2.0rem' },
    display1: { fontSize: '1.8rem' },

    headline: { fontSize: '2.4rem' },
    title: { fontSize: "2.0rem" },
    subheading: { fontSize: "1.8rem" },

    body2: { fontSize: '1.8rem' },
    body1: { fontSize: '1.8rem' },
    body: { fontSize: '1.8rem' },

    h1: { fontSize: '3.6rem' },
    h2: { fontSize: '3.0rem' },
    h3: { fontSize: '2.4rem' },
    h4: { fontSize: '2.2rem' },
    h5: { fontSize: '2.0rem' },
    h6: { fontSize: '1.8rem' },

    button: { fontSize: '1.8rem' }

  },

  //---------------------------------

  typographyMD: {

    fontSize: '16px',

    display4: { fontSize: '2.4rem' },
    display3: { fontSize: '2.0rem' },
    display2: { fontSize: '1.8rem' },
    display1: { fontSize: '1.6rem' },

    headline: { fontSize: '2.0rem' },
    title: { fontSize: "1.8rem" },
    subheading: { fontSize: "1.6rem" },

    body2: { fontSize: '1.6rem' },
    body1: { fontSize: '1.6rem' },
    body: { fontSize: '1.6rem' },

    h1: { fontSize: '3.0rem' },
    h2: { fontSize: '2.4rem' },
    h3: { fontSize: '2.2rem' },
    h4: { fontSize: '2.0rem' },
    h5: { fontSize: '1.8rem' },
    h6: { fontSize: '1.6rem' },

    button: { fontSize: '1.6rem' }

  },

  //---------------------------------

  typographySM: {

    fontSize: '14px',

    display4: { fontSize: '2.0rem' },
    display3: { fontSize: '1.8rem' },
    display2: { fontSize: '1.6rem' },
    display1: { fontSize: '1.4rem' },

    headline: { fontSize: '1.8rem' },
    title: { fontSize: "1.6rem" },
    subheading: { fontSize: "1.4rem" },

    body2: { fontSize: '1.4rem' },
    body1: { fontSize: '1.4rem' },
    body: { fontSize: '1.4rem' },

    h1: { fontSize: '2.4rem' },
    h2: { fontSize: '2.2rem' },
    h3: { fontSize: '2.0rem' },
    h4: { fontSize: '1.8rem' },
    h5: { fontSize: '1.6rem' },
    h6: { fontSize: '1.4rem' },

    button: { fontSize: '1.6rem' }

  }



}