import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { locales } from "@locales";
import { RTKProvider } from "@store";
import { MuiProvider } from "../theme/Provider";

export const AllTheProviders: FC = ({ children }) => {
  const locale = "en";
  return (
    <IntlProvider locale={locale} messages={locales[locale]}>
      <RTKProvider>
        <MuiProvider locale={locale}>{children}</MuiProvider>
      </RTKProvider>
    </IntlProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
