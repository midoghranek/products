import type { AppProps } from "next/app";
import { COOKIE_LANG, DEFAULT_LANG } from "@constants";
import { setCookies } from "cookies-next";
import { MuiProvider } from "@theme";
import { Languages } from "@types";
import Head from "next/head";
import { Container } from "@mui/material";
import { IntlProvider } from "react-intl";
import { locales } from "@locales";
import { RTKProvider } from "@store";
import { MainLayout } from "shared/layouts";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (router.locale !== DEFAULT_LANG) setCookies(COOKIE_LANG, router.locale);
  return (
    <RTKProvider>
      <IntlProvider
        locale={router.locale as string}
        messages={locales[router.locale as string]}
      >
        <MuiProvider locale={router.locale as Languages}>
          <Head>
            <style>{`html { direction: ${
              router.locale === "ar" ? "rtl" : "ltr"
            } }`}</style>
          </Head>
          <MainLayout>
            <Container>
              <Component {...pageProps} />
            </Container>
          </MainLayout>
        </MuiProvider>
      </IntlProvider>
    </RTKProvider>
  );
}

export default MyApp;
