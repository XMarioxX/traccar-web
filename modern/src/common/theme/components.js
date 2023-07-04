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
        color: 'white',
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        color: 'white',
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
  MuiBadge: {
    styleOverrides: {
      root: {
        backgroundColor: '#163b61',
        color: 'white',
      },
    },
  },
};
