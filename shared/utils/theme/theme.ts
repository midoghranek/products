import { Languages } from "@types";
import { createTheme } from "@mui/material/styles";

export const theme = (locale: Languages) =>
  createTheme({
    direction: locale === "ar" ? "rtl" : "ltr",
    typography: {
      fontFamily:
        locale === "ar" ? "Tajawal, Merriweather" : "Merriweather, Tajawal",
    },
  });
