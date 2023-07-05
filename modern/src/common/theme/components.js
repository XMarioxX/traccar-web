import { grey } from '@mui/material/colors';

export default {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: grey[50],
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      sizeMedium: {
        height: '40px',
      },
      outlinedSecondary: {
        color: 'red',
      },
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: '#163b61',
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        color: 'black',
      },
    },
  },
  MuiBottomNavigation: {
    styleOverrides: {
      root: {
        backgroundColor: '#163b61',
        color: 'white',
      },
    },
  },
  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        color: 'white !important',
      },
    },
  },

};
