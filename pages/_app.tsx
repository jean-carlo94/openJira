import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'

import { Compose } from '@utils';
import { UIProvider } from '@UIproviders';
import { EntriesProvider } from '@Entryproviders';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '@themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <Compose components={[UIProvider, EntriesProvider]}>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
      </Compose>
    </SnackbarProvider>
  )
};