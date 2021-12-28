import { useRouter } from "next/router";

const useSwitchLang = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const switchLang = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.push({ pathname, query }, asPath, { locale: nextLocale });
  };

  return { switchLang, locale };
};

export default useSwitchLang;
