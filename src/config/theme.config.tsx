import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

type ThemeProps = {
  children: JSX.Element;
};

export enum ThemePalette {
  BG = "#e9fff9",
  COLOR1 = "#467599",
  COLOR2='#1D3354',
  FONT_GLOBAL = "'Montserrat', sans-serif;",
  //Alerts
  ERROR_MAIN = "#f44336",
  BG_ERROR_MAIN = "rgba(244, 67, 54, 0.1)",
  SUCCESS_MAIN = "#66bb6a",
  BG_SUCCESS_MAIN = "rgba(102, 187, 106)",
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: ThemePalette.BG,
    },
    primary: {
      main: ThemePalette.COLOR1,
    },
    secondary: {
      main: ThemePalette.COLOR2,
    },
    error: {
      main: ThemePalette.ERROR_MAIN,
      contrastText: '#fff',
    },
    success: {
      main: ThemePalette.SUCCESS_MAIN,
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ThemePalette.FONT_GLOBAL,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '0.5em',
          backgroundColor: '#D64045',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#e9fff9',
            color : '#D64045',
          },
          '&:active': {
            backgroundColor: '#e9fff9',
            color : '#D64045',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          border: `1px solid ${ThemePalette.ERROR_MAIN}`,
          backgroundColor: ThemePalette.BG_ERROR_MAIN,
        },
        standardSuccess: {
          border: `1px solid ${ThemePalette.SUCCESS_MAIN}`,
          backgroundColor: ThemePalette.BG_SUCCESS_MAIN,
        },
      },
    },
  },
});

export const ThemeConfig: React.FC<ThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
