import { Global, css } from "@emotion/react";

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Tajawal:wght@200;300;400;500;700&display=swap");
        html[lang="ar"] * {
          letter-spacing: 0;
        }
        body {
          padding: 0;
          margin: 0;
          background-color: #f8fafc;
          font-family: "Merriweather", "Tajawal";
        }
        html[lang="ar"] body {
          font-family: "Tajawal", "Merriweather";
        }
      `}
    />
  );
};
