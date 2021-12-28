import { LOCALES } from "@locales";
import { IntlShape, useIntl } from "react-intl";

type Returns = {
  readonly message: (_key: LOCALES) => string;
  readonly intl: IntlShape;
};

export function getIntlMessage(intl: IntlShape) {
  return (key: LOCALES): string => {
    if (!key) return "";
    return intl.formatMessage({ id: key });
  };
}

const useTranslate = (): Returns => {
  const intl = useIntl();
  const message = getIntlMessage(intl);
  return { message, intl };
};

export default useTranslate;
