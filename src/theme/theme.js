// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors) => {
  const { red, gold, green, grey } = colors;
  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };
  const contrastText = "#fff";

  return {
    primary: {
      lighter: "#f1e3ed",
      100: "#dcbad4",
      200: "#c68db9",
      light: "#ae629e", // primary
      400: "#9d438a",
      main: "#8e227b",
      dark: "#831e76",
      700: "#73176f",
      darker: "#651067",
      900: "#651067",
      contrastText,
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500],
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0],
    },
    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      darker: red[9],
      contrastText,
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100],
    },
    info: {
      lighter: "#5c709c",
      light: "#385185",
      main: "#202d54",
      dark: "#293d6c",
      darker: "#202d54",
      contrastText,
    },
    success: {
      lighter: green[0],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText,
    },
    grey: greyColors,
  };
};

export default Theme;
