import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { Languages } from "@types";
import { theme, GlobalStyles } from "@theme";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

type RTLProps = {
  readonly children: ReactNode;
};

export function RTL({ children }: RTLProps) {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

type MuiProviderProps = {
  readonly children: ReactNode;
  readonly locale: string;
};

export function MuiProvider({ locale, children }: MuiProviderProps) {
  if (locale === "ar") {
    return (
      <RTL>
        <ThemeProvider theme={theme(locale as Languages)}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </RTL>
    );
  }

  return (
    <ThemeProvider theme={theme(locale as Languages)}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
